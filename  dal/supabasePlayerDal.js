import { supabase } from "../lib/supabaseClient.js";

//====================================
// GET all player names + roles
//====================================
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

//====================================
// GET all players sorted by total_solved DESC
//====================================
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

//====================================
// INSERT new solved riddle
//====================================
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

//====================================
// CREATE a new player (with role)
//====================================
export async function createPlayer({ name, role = "guest" }) {
  // check if player already exists
  const { data: existing, error: existingError } = await supabase
    .from("players")
    .select("*")
    .eq("name", name)
    .maybeSingle();

  if (existingError) {
    console.error("Supabase error (check existence):", existingError.message);
    throw new Error("Failed to check player existence");
  }

  if (existing) {
    throw new Error("Player already exists");
  }

  const { data, error } = await supabase
    .from("players")
    .insert([{ name, role }])
    .select()
    .maybeSingle();

  if (error) {
    console.error("Supabase error (createPlayer):", error.message);
    throw new Error("Failed to create player");
  }

  return data;
}
