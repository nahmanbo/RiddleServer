import {
  getPlayerNames,
  getPlayersSortedByTotal,
  insertSolvedRiddle,
  createPlayer,
  loginPlayer
} from "../ dal/supabasePlayerDal.js";
import jwt from "jsonwebtoken";


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
// POST /players - Create new player 
//====================================
export async function createPlayerController(req, res) {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "Missing name or password" });
  }

  try {
    const newPlayer = await createPlayer({ name, password });
    res.status(201).json(newPlayer);
  } catch (err) {
    if (err.message === "Player already exists") {
      res.status(409).json({ message: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
}
// POST /players/login - Authenticate player and return JWT
export async function loginPlayerController(req, res) {
  const { name, password } = req.body;

  try {
    const player = await loginPlayer({ name, password });

    const token = jwt.sign(
      {
        id: player.id,
        name: player.name,
        role: player.role
      },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, player });
  } catch (err) {
    if (err.message === "Player not found" || err.message === "Incorrect password") {
      res.status(401).json({ error: "Invalid name or password" });
    } else {
      res.status(500).json({ error: "Login failed" });
    }
  }
}

