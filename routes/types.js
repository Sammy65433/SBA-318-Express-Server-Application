import express from "express";
import types from "../data/types.js";
import pokemon from "../data/pokemon.js";

const router = express.Router();

// GET /types
// This route returns the full list of pokemon types.
router.get("/", (req, res) => {
  // Send the entire types array as JSON
  res.json(types);
});

// GET /types/:id
// This route returns one type by its id.
router.get("/:id", (req, res) => {
  // Look through the types array and find the type
  // whose id matches the id from the URL
  const type = types.find(t => t.id === Number(req.params.id));

  // If no matching type is found, return a 404 error
  if (!type) {
    return res.status(404).json({ error: "Type not found" });
  }

  // If found, return the type as JSON
  res.json(type);
});

// GET /types/:id/pokemon
// This route returns all pokemon that belong to a specific type.
router.get("/:id/pokemon", (req, res) => {
  // Filter the pokemon array and keep only pokemon
  // whose typeId matches the id from the URL
  const typePokemon = pokemon.filter(
    p => p.typeId === Number(req.params.id)
  );

  // Return the filtered pokemon list as JSON
  res.json(typePokemon);
});

export default router;
