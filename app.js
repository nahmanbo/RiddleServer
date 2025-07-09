import express from "express";
import mainRouter from "./routes/mainRouter.js"; 

const PORT = 1234;
const server = express();

//-------------Middleware---------------
function logger(req, res, next) {
  console.log(`Got request: method = ${req.method}, url = ${req.url}`);
  next();
}

server.use(express.json());  
server.use(logger);         

//-------------Routes---------------
server.use("/", mainRouter);

//-------------Start server---------------
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
