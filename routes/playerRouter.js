import { Router } from "express";
import { readItemsFromFile,  createItemToFile, updateItemById} from "../DAL/fsDal.js";

const router = Router();
const filePath = "../lib/players.txt";

//====================================
// GET /player - Returns all players
//====================================
router.get("/", async (req, res) => {
  try {
    const players = await readItemsFromFile(filePath);
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
    const saved = await createItemToFile(filePath, newPlayer);
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
    const updatedList = await updateItemById(filePath, id, newData);
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: "Failed to update data" });
  }
});

export default router;