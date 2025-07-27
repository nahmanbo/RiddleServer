import {
  getPlayerNames,
  getPlayersSortedByTotal,
  insertSolvedRiddle,
  createPlayer,
  loginPlayer,
  createGuestPlayer
} from "../ dal/supabasePlayerDal.js";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// Get all player names
export async function getPlayerNamesController(req, res) {
  try {
    const players = await getPlayerNames();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get players sorted by total solved
export async function getPlayersSortedByTotalController(req, res) {
  try {
    const players = await getPlayersSortedByTotal();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Save solved riddle result
export async function solveRiddleController(req, res) {
  try {
    const result = await insertSolvedRiddle(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Register a new player
export async function createPlayerController(req, res) {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "Missing name or password" });
  }

  try {
    const player = await createPlayer({ name, password });
    res.status(201).json(player);
  } catch (err) {
    const code = err.message === "Player already exists" ? 409 : 500;
    res.status(code).json({ error: err.message });
  }
}

// Authenticate and return JWT
export async function loginPlayerController(req, res) {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "Missing name or password" });
  }

  try {
    const player = await loginPlayer({ name, password });
    const token = generateToken(player);
    res.status(200).json({ token, player });
  } catch (err) {
    const code = err.message.includes("password") || err.message.includes("not found") ? 401 : 500;
    res.status(code).json({ error: "Invalid name or password" });
  }
}

// Create or reuse guest player and return JWT
export async function guestPlayerController(req, res) {
  const { name } = req.body;

  try {
    const player = await createGuestPlayer(name);
    const token = generateToken(player);
    res.status(201).json({ token, player });
  } catch (err) {
    res.status(500).json({ error: "Failed to create guest player" });
  }
}

// Helper to generate JWT
function generateToken(player) {
  return jwt.sign(
    { id: player.id, name: player.name, role: player.role },
    process.env.JWT_SECRET || "dev-secret",
    { expiresIn: "1h" }
  );
}
