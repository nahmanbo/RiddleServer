import {
  getAllRiddles,
  createRiddle,
  updateRiddle,
  deleteRiddle
} from "../dal/mongoRiddleDal.js";

//====================================
// GET /riddles - Controller handler
//====================================
export async function getAllRiddlesController(req, res) {
  try {
    const riddles = await getAllRiddles();
    res.json(riddles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch riddles" });
  }
}

//====================================
// GET /riddles/difficulty/:difficulty - Filter by difficulty
//====================================
export async function getRiddlesByDifficulty(req, res) {
  const difficulty = req.params.difficulty;
  try {
    const allRiddles = await getAllRiddles();
    const filtered = allRiddles.filter(r => r.level === difficulty);
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: "Failed to filter riddles" });
  }
}

//====================================
// POST /riddles - Add new riddle
//====================================
export async function addRiddleController(req, res) {
  const newRiddle = req.body;
  try {
    const result = await createRiddle(newRiddle);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to save riddle" });
  }
}

//====================================
// PUT /riddles/:id - Update by ID
//====================================
export async function updateRiddleController(req, res) {
  const id = Number(req.params.id);
  const newData = req.body;
  try {
    const result = await updateRiddle(id, newData);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to update riddle" });
  }
}

//====================================
// DELETE /riddles/:id - Delete by ID
//====================================
export async function deleteRiddleController(req, res) {
  const id = Number(req.params.id);
  try {
    const result = await deleteRiddle(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete riddle" });
  }
}
