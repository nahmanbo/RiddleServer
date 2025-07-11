import { Router } from "express";
import {
  getAllPlayers,
  addPlayer,
  updatePlayer
} from "../controllers/playerController.js";

const router = Router();

//====================================
// GET /players - Returns all players
//====================================
router.get("/", getAllPlayers);

//====================================
// POST /players - Creates a new player
//====================================
router.post("/", addPlayer);

//====================================
// PUT /players/:id - Updates a player by ID
//====================================
router.put("/:id", updatePlayer);

export default router;
