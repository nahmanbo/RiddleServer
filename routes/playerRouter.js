import { Router } from "express";
import { readData } from "../services/read.js";
import { createData } from "../services/create.js";
import { updateData } from "../services/update.js";

const router = Router();
const filePath = "../lib/players.txt";

//====================================
// GET /player - Returns all players
//====================================
router.get("/", async (req, res) => {
  try {
    const players = await readData(filePath);
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: "Failed to read data" });
  }
});

//====================================
// POST /player - Creates a new player
//====================================
router.post("/", async (req, res) => {
  const newPlayer = req.body;
  try {
    const saved = await createData(filePath, newPlayer);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save data" });
  }
});

//====================================
// PUT /player/:id - Updates a player by ID
//====================================
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const newData = req.body;

  try {
    const updatedList = await updateData(filePath, id, newData);
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: "Failed to update data" });
  }
});

export default router;
