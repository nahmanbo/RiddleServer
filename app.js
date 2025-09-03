import express from "express";
import cors from "cors";

import riddleRouter from "./routes/riddleRouter.js";
import playerRouter from "./routes/playerRouter.js";
import { logger } from "./utils/loggerHelper.js";

const PORT = 1212;
const app = express();

// ================================
// Middleware
// ================================
app.use(express.json());
app.use(cors()); 
app.use(logger);

// ================================
// Routes
// ================================
app.use("/riddles", riddleRouter);
app.use("/players", playerRouter);

// ================================
// Start Server
// ================================
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
