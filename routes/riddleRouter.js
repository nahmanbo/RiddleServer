import { Router } from "express";
const router = Router();

// GET /riddles
router.get("/", (req, res) => {
  res.send("Get all riddles");
});

// POST /riddles
router.post("/", (req, res) => {
  res.send("Add a new riddle");
});

// PUT /riddles/:id
router.put("/:id", (req, res) => {
  res.send(`Update riddle with id ${req.params.id}`);
});

// DELETE /riddles/:id
router.delete("/:id", (req, res) => {
  res.send(`Delete riddle with id ${req.params.id}`);
});

export default router;
