
import express from "express";
import types from "../data/types.js"
import pokemon from "../data/pokemon.js";


const router = express.Router();

// GET /types
router.get("/", (req, res) => {
  res.json(types);
});


export default router;