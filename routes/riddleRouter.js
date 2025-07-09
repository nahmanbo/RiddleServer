import { Router } from "express";
import { readData } from "../services/read.js";
import { createData } from "../services/create.js";
import { updateData } from "../services/update.js";
import { deleteData } from "../services/delete.js";

const router = Router();
const filePath = "./lib/riddles.txt";

//------------- GET /riddles ---------------
router.get("/", async (req, res) => {
  const riddles = await readData(filePath);
  res.json(riddles);
});

//------------- POST /riddles ---------------
router.post("/", async (req, res) => {
    const newRiddle = req.body;
    const saved = await createData(filePath, newRiddle);
    res.status(201).json(saved);
  });
  
//------------- PUT /riddles/:id ---------------
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const newData = req.body;
  const updatedList = await updateData(filePath, id, newData);
  res.json(updatedList);
});

//------------- DELETE /riddles/:id ---------------
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updatedList = await deleteData(filePath, id);
  res.json(updatedList);
});

export default router;


// curl -X POST http://localhost:1234/riddles \
//   -H "Content-Type: application/json" \
//   -d '{"subject":"Math","difficulty":"Hard","taskDescription":"What is (6 + 4) x 5?","correctAnswer":"50"}'
