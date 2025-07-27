import {
  getPlayerNames,
  getPlayersSortedByTotal,
  insertSolvedRiddle,
  createPlayer
} from "../dal/supabasePlayerDal.js";

//====================================
// GET /players - List all player names and roles
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
// GET /players/sorted-by-total - Sorted player list
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
// POST /players/solve - Save solved riddle
//====================================
export async function solveRiddleController(req, res) {
  try {
    const result = await insertSolvedRiddle(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//====================================
// POST /players - Create new player (with role)
//====================================
export async function createPlayerController(req, res) {
  const { name, role } = req.body;

  try {
    const newPlayer = await createPlayer({ name, role });
    res.status(201).json(newPlayer);
  } catch (err) {
    if (err.message === "Player already exists") {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
}
