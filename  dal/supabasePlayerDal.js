import { supabase } from "../lib/supabaseClient.js";
import bcrypt from "bcrypt";

// Find a player by name
async function findPlayerByName(name) {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("name", name)
    .maybeSingle();

  if (error) {
    console.error("Supabase error (findPlayerByName):", error.message);
    throw new Error("Failed to check player existence");
  }

  return data || null;
}

// Insert a new player (shared logic for user/guest)
async function insertPlayer(playerData) {
  const { data, error } = await supabase
    .from("players")
    .insert([playerData])
    .select()
    .maybeSingle();

  if (error) {
    if (error.code === "23505") {
      throw new Error("Player already exists");
    }
    console.error("Supabase error (insertPlayer):", error.message);
    throw new Error("Failed to insert player");
  }

  return data;
}

// Get all player IDs, names, and roles
export async function getPlayerNames() {
  const { data, error } = await supabase
    .from("players")
    .select("id, name, role");

  if (error) {
    console.error("Supabase error (getPlayerNames):", error.message);
    throw new Error("Failed to fetch player names");
  }

  return data;
}

// Get all players sorted by total_solved
export async function getPlayersSortedByTotal() {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("total_solved", { ascending: false });

  if (error) {
    console.error("Supabase error (getPlayersSortedByTotal):", error.message);
    throw new Error("Failed to fetch sorted players");
  }

  return data;
}

// Add a solved riddle entry
export async function insertSolvedRiddle({ player_id, riddle_id, difficulty, solved_time }) {
  const { data, error } = await supabase
    .from("solved_riddles")
    .insert([{ player_id, riddle_id, difficulty, solved_time }])
    .select();

  if (error) {
    console.error("Supabase error (insertSolvedRiddle):", error.message);
    throw new Error("Failed to insert solved riddle");
  }

  return data[0];
}

// Create a new registered player
export async function createPlayer({ name, password }) {
  const existing = await findPlayerByName(name);
  if (existing) throw new Error("Player already exists");

  const passwordhash = await bcrypt.hash(password, 10);
  const data = await insertPlayer({ name, passwordhash });

  return {
    id: data.id,
    name: data.name,
    role: data.role
  };
}

// Login an existing player (verify password)
export async function loginPlayer({ name, password }) {
  const player = await findPlayerByName(name);
  if (!player) throw new Error("Player not found");

  const match = await bcrypt.compare(password, player.passwordhash);
  if (!match) throw new Error("Incorrect password");

  return {
    id: player.id,
    name: player.name,
    role: player.role
  };
}

// Create or fetch a guest player
export async function createGuestPlayer(name) {
  try {
    return await insertPlayer({ name, role: "guest" });
  } catch (err) {
    if (err.message === "Player already exists") {
      const existing = await findPlayerByName(name);
      if (!existing) {
        throw new Error("Failed to fetch existing guest");
      }
      return existing;
    }
    throw err;
  }
}
