import { Router } from "express";
import {
  getAllRiddlesController,
  getRiddlesByDifficulty,
  addRiddleController,
  updateRiddleController,
  deleteRiddleController
} from "../controllers/riddleController.js";

const router = Router();

//====================================
// GET /riddles - All riddles
//====================================
router.get("/", getAllRiddlesController);

//====================================
// GET /riddles/difficulty/:difficulty
//====================================
router.get("/difficulty/:difficulty", getRiddlesByDifficulty);

//====================================
// POST /riddles - Add new riddle
//====================================
router.post("/", addRiddleController);

//====================================
// PUT /riddles/:id - Update existing riddle
//====================================
router.put("/:id", updateRiddleController);

//====================================
// DELETE /riddles/:id - Delete riddle
//====================================
router.delete("/:id", deleteRiddleController);

export default router;
