import { Router } from "express";
import { readItemsFromFile,  createItemToFile, updateItemById, deleteItemById} from "../DAL/fsDal.js";

const router = Router();
const filePath = "./lib/riddles.txt";

//====================================
// GET /riddles - Returns all riddles
//====================================
router.get("/", async (req, res) => {
  try {
    const riddles = await readItemsFromFile(filePath);
    res.json(riddles);
  } catch (err) {
    res.status(500).json({ error: "Failed to read data" });
  }
});

//====================================
// POST /riddles - Creates a new riddle
//====================================
router.post("/", async (req, res) => {
  const newRiddle = req.body;
  try {
    const saved = await createItemToFile(filePath, newRiddle);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save data" });
  }
});

//====================================
// PUT /riddles/:id - Updates a riddle by ID
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

//====================================
// DELETE /riddles/:id - Deletes a riddle by ID
//====================================
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const updatedList = await deleteItemById(filePath, id);
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete data" });
  }
});

export default router;
