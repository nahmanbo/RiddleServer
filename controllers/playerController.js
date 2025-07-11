import { readItemsFromFile } from "../dal/readItems.js";
import { createItemToFile } from "../dal/createItem.js";
import { updateItemById } from "../dal/updateItem.js";

const filePath = "./lib/players.txt";

//====================================
// GET /players - Controller handler
//====================================
export async function getAllPlayers(req, res) {
  try {
    const players = await readItemsFromFile(filePath);
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: "Failed to read data" });
  }
}

//====================================
// POST /players - Controller handler
//====================================
export async function addPlayer(req, res) {
  const newPlayer = req.body;
  try {
    const result = await createItemToFile(filePath, newPlayer);
    if (!result.success) throw new Error(result.error);
    res.status(201).json(result.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to save data" });
  }
}

//====================================
// PUT /players/:id - Controller handler
//====================================
export async function updatePlayer(req, res) {
  const id = Number(req.params.id);
  const newData = req.body;

  try {
    const result = await updateItemById(filePath, id, newData);
    if (!result.success) throw new Error(result.error);
    res.json(result.updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update data" });
  }
}

