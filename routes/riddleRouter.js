import { Router } from "express";
import {
  getAllRiddles,
  addRiddle,
  updateRiddle,
  deleteRiddle
} from "../controllers/riddleController.js";

const router = Router();

//====================================
// GET /riddles - Returns all riddles
//====================================
router.get("/", getAllRiddles);

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
