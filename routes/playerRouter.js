import { Router } from "express";
import {
  getAllPlayersController,
  createPlayerController,
  updatePlayerController,
  getPlayersSortedByTimeController,
} from "../controllers/playerController.js";

const router = Router();

// ================================
// GET /players - Get all players
// ================================
router.get("/", getAllPlayersController);

// ================================
// GET /players/sorted-by-time - Get players sorted by average time
// ================================
router.get("/sorted-by-time", getPlayersSortedByTimeController);

// ================================
// POST /players - Create new player
// ================================
router.post("/", createPlayerController);

// ================================
// PUT /players/:id - Update a player by ID
// ================================
router.put("/:id", updatePlayerController);

export default router;
