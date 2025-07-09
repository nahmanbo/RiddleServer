import { Router } from "express";
import riddleRouter from "./riddleRouter.js";
import playerRouter from "./playerRouter.js";

const router = Router();

router.use("/riddles", riddleRouter);
router.use("/players", playerRouter);

export default router;
