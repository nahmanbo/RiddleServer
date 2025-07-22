import { supabase } from "../lib/supabaseClient.js";

//====================================
// GET just player names (id + name)
//====================================
export async function getPlayerNames() {
  const { data, error } = await supabase
    .from("players")
    .select("id, name");

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
