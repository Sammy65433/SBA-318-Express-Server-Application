import express from "express";
import pokemon from "../data/pokemon.js";

const router = express.Router();
// GET /pokemon
// This route returns all pokemon.
// It can also filter the pokemon list using query parameters.
router.get("/", (req, res) => {
  // Pull possible filters from the URL query string
  // Example: /pokemon?typeId=2&trainerId=1&name=char
  const { typeId, trainerId, name } = req.query;

  // Start with the full pokemon array
  let results = pokemon;

  // If typeId was provided, keep only pokemon with that typeId
  // Number() converts the query string into a number
  if (typeId) {
    results = results.filter(p => p.typeId === Number(typeId));
  }

  // If trainerId was provided, keep only pokemon owned by that trainer
  if (trainerId) {
    results = results.filter(p => p.trainerId === Number(trainerId));
  }

  // If name was provided, keep pokemon whose name contains that text
  // toLowerCase() makes the search case-insensitive
  if (name) {
    results = results.filter(p =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Send the final filtered list as JSON
  res.json(results);
});

// GET /pokemon/:id
// This route returns one pokemon by its id.
router.get("/:id", (req, res) => {
  // Find the pokemon whose id matches the route parameter
  const onePokemon = pokemon.find(p => p.id === Number(req.params.id));

  // If no pokemon is found, return a 404 error
  if (!onePokemon) {
    return res.status(404).json({ error: "Pokemon not found" });
  }

  // If found, return that pokemon as JSON
  res.json(onePokemon);
});

// POST /pokemon
// This route creates a new pokemon and adds it to the array.
router.post("/", (req, res) => {
  // Pull fields from the request body
  const { name, trainerId, typeId, level } = req.body;

  // Validate required fields
  // If any required field is missing, return 400 Bad Request
  if (!name || !trainerId || !typeId) {
    return res.status(400).json({
      error: "name, trainerId, and typeId are required"
    });
  }

  // Build the new pokemon object
  const newPokemon = {
    // If array has items, use last id + 1
    // If array is empty, start at id 1
    id: pokemon.length ? pokemon[pokemon.length - 1].id + 1 : 1,

    // Store the pokemon name
    name,

    // Convert incoming ids to numbers
    trainerId: Number(trainerId),
    typeId: Number(typeId),

    // If level was provided, convert it to a number
    // Otherwise default to level 1
    level: level ? Number(level) : 1
  };

  // Add the new pokemon to the in-memory array
  pokemon.push(newPokemon);

  // Return 201 Created with the new pokemon
  res.status(201).json(newPokemon);
});

// PATCH /pokemon/:id
// This route updates part of an existing pokemon.
router.patch("/:id", (req, res) => {
  // Find the pokemon by id
  const onePokemon = pokemon.find(p => p.id === Number(req.params.id));

  // If not found, return 404
  if (!onePokemon) {
    return res.status(404).json({ error: "Pokemon not found" });
  }

  // Only update fields that were included in the request body
  if (req.body.name) onePokemon.name = req.body.name;
  if (req.body.trainerId) onePokemon.trainerId = Number(req.body.trainerId);
  if (req.body.typeId) onePokemon.typeId = Number(req.body.typeId);
  if (req.body.level) onePokemon.level = Number(req.body.level);

  // Return the updated pokemon
  res.json(onePokemon);
});



export default router;