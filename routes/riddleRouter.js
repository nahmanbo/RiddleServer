import { Router } from "express";
import {
  getAllRiddlesController,
  getRiddlesByDifficulty,
  addRiddleController,
  updateRiddleController,
  deleteRiddleController,
} from "../controllers/riddleController.js";

import { authenticateJWT } from "../middlewares/authenticateJWT.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = Router();

// Get all riddles (public)
router.get("/", getAllRiddlesController);

// Get riddles filtered by difficulty (public)
router.get("/difficulty/:difficulty", getRiddlesByDifficulty);

// Add new riddle (admin only)
router.post("/", authenticateJWT, requireRole("admin"), addRiddleController);

// Update a riddle by ID (admin only)
router.put("/:id", authenticateJWT, requireRole("admin"), updateRiddleController);

// Delete a riddle by ID (admin only)
router.delete("/:id", authenticateJWT, requireRole("admin"), deleteRiddleController);

export default router;
