import {
    getAllPlayers,
    createPlayer,
    updatePlayer
  } from "../ dal/supabasePlayerDal.js";
  
  //====================================
  // GET /players - Controller
  //====================================
  export async function getAllPlayersController(req, res) {
    try {
      const players = await getAllPlayers();
      res.json(players);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  //====================================
  // POST /players - Controller
  //====================================
  export async function createPlayerController(req, res) {
    try {
      const player = await createPlayer(req.body);
      res.status(201).json(player);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  //====================================
  // PUT /players/:id - Controller
  //====================================
  export async function updatePlayerController(req, res) {
    const id = Number(req.params.id);
    try {
      const updated = await updatePlayer(id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  