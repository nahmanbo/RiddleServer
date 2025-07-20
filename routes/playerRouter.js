import { Router } from "express";
import {
  getAllPlayersController,
  createPlayerController,
  updatePlayerController
} from "../controllers/playerController.js";

const router = Router();

//====================================
// GET /players
//====================================
router.get("/", getAllPlayersController);

//====================================
// POST /players
//====================================
router.post("/", createPlayerController);

//====================================
// PUT /players/:id
//====================================
router.put("/:id", updatePlayerController);

export default router;
