import {
  getPlayerNames,
  getPlayersSortedByTotal,
  insertSolvedRiddle,
  createPlayer
} from "../ dal/supabasePlayerDal.js"; 

//====================================
// GET /players - Just player names
//====================================
export async function getPlayerNamesController(req, res) {
  try {
    const players = await getPlayerNames();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//====================================
// GET /players/sorted-by-total
//====================================
export async function getPlayersSortedByTotalController(req, res) {
  try {
    const players = await getPlayersSortedByTotal();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//====================================
// POST /players/solve
//====================================
export async function solveRiddleController(req, res) {
  const { player_id, riddle_id, difficulty, solved_time } = req.body;

  if (!player_id || !riddle_id || !difficulty || !solved_time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await insertSolvedRiddle({ player_id, riddle_id, difficulty, solved_time });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//====================================
// POST /players - Create new player
//====================================
export async function createPlayerController(req, res) {
  try {
    const player = await createPlayer(req.body);
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
