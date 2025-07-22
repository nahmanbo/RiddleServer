import { Router } from "express";
import {
  getAllRiddlesController,
  getRiddlesByDifficulty,
  addRiddleController,
  updateRiddleController,
  deleteRiddleController,
} from "../controllers/riddleController.js";

const router = Router();

// ================================
// GET /riddles - Get all riddles
// ================================
router.get("/", getAllRiddlesController);

// ================================
// GET /riddles/difficulty/:difficulty - Filter riddles by difficulty
// ================================
router.get("/difficulty/:difficulty", getRiddlesByDifficulty);

// ================================
// POST /riddles - Add new riddle
// ================================
router.post("/", addRiddleController);

// ================================
// PUT /riddles/:id - Update a riddle by ID
// ================================
router.put("/:id", updateRiddleController);

// ================================
// DELETE /riddles/:id - Delete a riddle by ID
// ================================
router.delete("/:id", deleteRiddleController);

export default router;
