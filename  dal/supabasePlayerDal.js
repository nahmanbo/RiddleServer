import { supabase } from "../lib/supabaseClient.js";

//====================================
// GET all players
//====================================
export async function getAllPlayers() {
  const { data, error } = await supabase.from("players").select("*");
  if (error) {
    console.error("❌ Supabase error (getAllPlayers):", error.message);
    throw new Error("Failed to fetch players");
  }
  return data;
}

//====================================
// CREATE a new player
//====================================
export async function createPlayer(player) {
  const { data, error } = await supabase.from("players").insert([player]).select();
  if (error) {
    console.error("❌ Supabase error (createPlayer):", error.message);
    throw new Error("Failed to create player");
  }
  return data[0];
}

//====================================
// UPDATE player by id
//====================================
export async function updatePlayer(id, newData) {
  const { data, error } = await supabase.from("players")
    .update(newData)
    .eq("id", id)
    .select();
  if (error) {
    console.error("❌ Supabase error (updatePlayer):", error.message);
    throw new Error("Failed to update player");
  }
  return data[0];
}
