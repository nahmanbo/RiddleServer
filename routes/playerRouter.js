import { Router } from "express";
import {
  getPlayerNamesController,
  getPlayersSortedByTotalController,
  solveRiddleController,
  createPlayerController,
  loginPlayerController,
  guestPlayerController
} from "../controllers/playerController.js";

import { authenticateJWT } from "../middlewares/authenticateJWT.js";

const router = Router();

// Get all player names (public)
router.get("/", getPlayerNamesController);

// Get players sorted by total_solved (guest/user/admin)
router.get("/sorted-by-total", authenticateJWT, getPlayersSortedByTotalController);

// Solve a riddle (requires token: guest/user/admin)
router.post("/solve", authenticateJWT, solveRiddleController);

// Register new player (public)
router.post("/", createPlayerController);

// Login with credentials (public)
router.post("/login", loginPlayerController);

// Create guest player and return token (public)
router.post("/guest", guestPlayerController);

export default router;
