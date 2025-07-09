import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("Get all players");
});

router.post("/", (req, res) => {
  res.send("Add a new player");
});

router.put("/:id", (req, res) => {
  res.send(`Update player with id ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`Delete player with id ${req.params.id}`);
});

export default router;
