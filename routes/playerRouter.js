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

//====================================
// GET /players - Just player names
//====================================
router.get("/", getPlayerNamesController);

//====================================
// GET /players/sorted-by-total
//====================================
router.get("/sorted-by-total", authenticateJWT, getPlayersSortedByTotalController);

//====================================
// POST /players/solve
//====================================
router.post("/solve", solveRiddleController);

//====================================
// POST /players - Create new player
//====================================
router.post("/", createPlayerController);

router.post("/login", loginPlayerController);
router.post("/guest", guestPlayerController);



export default router;
