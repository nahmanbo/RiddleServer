import express from "express";
import riddleRouter from "./routes/riddleRouter.js";
import playerRouter from "./routes/playerRouter.js";

const PORT = 1234;
const server = express();

//-------------Middleware---------------

server.use(express.json());  
server.use(logger);         

//-------------Routes---------------
server.use("/riddles", riddleRouter);
server.use("/players", playerRouter);

//-------------Start server---------------
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
