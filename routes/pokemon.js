import express from "express";
import pokemon from "../data/pokemon.js";

const router = express.Router();

// GET /pokemon
router.get("/", (req, res) => {
  const { typeId, trainerId, name } = req.query;
  let results = pokemon;

  if (typeId) {
    results = results.filter(p => p.typeId === Number(typeId));
  }

  if (trainerId) {
    results = results.filter(p => p.trainerId === Number(trainerId));
  }

  if (name) {
    results = results.filter(p =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.json(results);
});

// / GET /pokemon/:id

router.get("/:id", (req, res) => {

    console.log("pokemon id route hit", req.params.id);

  const onePokemon = pokemon.find(p => p.id === Number(req.params.id));
  if (!onePokemon) return res.status(404).json({ error: "Pokemon not found" });

  
  res.json(onePokemon);
});

// GET /pokemon/:id
router.get("/:id", (req, res) => {
  const onePokemon = pokemon.find(p => p.id === Number(req.params.id));
  if (!onePokemon) return res.status(404).json({ error: "Pokemon not found" });

  res.json(onePokemon);
});


export default router;