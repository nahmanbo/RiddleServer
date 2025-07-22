import { Router } from "express";
import {
  getPlayerNamesController,
  getPlayersSortedByTotalController,
  solveRiddleController
} from "../controllers/playerController.js";

const router = Router();

//====================================
// GET /players - Just player names
//====================================
router.get("/", getPlayerNamesController);

//====================================
// GET /players/sorted-by-total
//====================================
router.get("/sorted-by-total", getPlayersSortedByTotalController);

//====================================
// POST /players/solve
//====================================
router.post("/solve", solveRiddleController);

export default router;
