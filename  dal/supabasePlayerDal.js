import { supabase } from "../lib/supabaseClient.js";
import bcrypt from "bcrypt";

// Find player by name (or null)
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

// Get all players sorted by total_solved (DESC)
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

// Insert new solved riddle record
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

// Create a new player with password
export async function createPlayer({ name, password }) {
  const existing = await findPlayerByName(name);
  if (existing) {
    throw new Error("Player already exists");
  }

  const passwordhash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("players")
    .insert([{ name, passwordhash }])
    .select()
    .maybeSingle();

  if (error) {
    console.error("Supabase error (createPlayer):", error.message);
    throw new Error("Failed to create player");
  }

  return {
    id: data.id,
    name: data.name,
    role: data.role
  };
}

// Login existing player by verifying password
export async function loginPlayer({ name, password }) {
  const player = await findPlayerByName(name);

  if (!player) {
    throw new Error("Player not found");
  }

  const match = await bcrypt.compare(password, player.passwordhash);
  if (!match) {
    throw new Error("Incorrect password");
  }

  return {
    id: player.id,
    name: player.name,
    role: player.role
  };
}

