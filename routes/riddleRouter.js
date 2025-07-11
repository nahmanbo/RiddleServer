import { Router } from "express";
import {
  getAllRiddles,
  addRiddle,
  updateRiddle,
  deleteRiddle, 
  getRiddlesByLevel
} from "../controllers/riddleController.js";

const router = Router();

//====================================
// GET /riddles - Returns all riddles
//====================================
router.get("/", getAllRiddles);

//====================================
// GET /riddles/level/:level - Filter riddles by difficulty level
//====================================
router.get("/level/:level", getRiddlesByLevel);

//====================================
// POST /riddles - Creates a new riddle
//====================================
router.post("/", addRiddle);

//====================================
// PUT /riddles/:id - Updates a riddle by ID
//====================================
router.put("/:id", updateRiddle);

//====================================
// DELETE /riddles/:id - Deletes a riddle by ID
//====================================
router.delete("/:id", deleteRiddle);

export default router;
