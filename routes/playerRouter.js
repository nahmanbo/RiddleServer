import { Router } from "express";
const router = Router();

// GET /players
router.get("/", (req, res) => {
  res.send("Get all players");
});

// GET /players/:id
router.get("/:id", (req, res) => {
  res.send(`Get player with id ${req.params.id}`);
});

// POST /players
router.post("/", (req, res) => {
  res.send("Add a new player");
});

// PUT /players/:id
router.put("/:id", (req, res) => {
  res.send(`Update player with id ${req.params.id}`);
});

// DELETE /players/:id
router.delete("/:id", (req, res) => {
  res.send(`Delete player with id ${req.params.id}`);
});

export default router;