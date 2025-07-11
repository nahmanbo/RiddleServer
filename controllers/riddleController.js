import { readItemsFromFile } from "../ dal/readItems.js";
import { createItemToFile } from "../ dal/createItem.js";
import { updateItemById } from "../ dal/updateItem.js";
import { deleteItemById } from "../ dal/deleteItem.js";

const filePath = "./lib/riddles.txt";

//====================================
// GET /riddles - Controller handler
//====================================
export async function getAllRiddles(req, res) {
  try {
    const riddles = await readItemsFromFile(filePath);
    res.json(riddles);
  } catch (err) {
    res.status(500).json({ error: "Failed to read data" });
  }
}

///====================================
// GET /riddles/difficulty/:difficulty - Get riddles by difficulty
//====================================
export async function getRiddlesByDifficulty(req, res) {
  const difficulty = req.params.difficulty;
  try {
    const filtered = await readItemsFromFile(filePath, { difficulty });
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: "Failed to read data" });
  }
}

//====================================
// POST /riddles - Controller handler
//====================================
export async function addRiddle(req, res) {
  const newRiddle = req.body;
  try {
    const result = await createItemToFile(filePath, newRiddle);
    if (!result.success) throw new Error(result.error);
    res.status(201).json(result.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to save data" });
  }
}

//====================================
// PUT /riddles/:id - Controller handler
//====================================
export async function updateRiddle(req, res) {
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

//====================================
// DELETE /riddles/:id - Controller handler
//====================================
export async function deleteRiddle(req, res) {
  const id = Number(req.params.id);

  try {
    const result = await deleteItemById(filePath, id);
    if (!result.success) throw new Error(result.error);
    res.json(result.updatedList);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete data" });
  }
}
