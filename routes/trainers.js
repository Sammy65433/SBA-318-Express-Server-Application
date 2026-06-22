// /routes.trainers.js

import express from "express";
import trainers from "../data/trainers.js";
import pokemon from "../data/pokemon.js"

const router = express.Router();


// GET /trainers
router.get("/", (req, res) => {                
    //Register a GET handler for the base path "/trainers"

    // Pull the optional query string parameter “region” from the request URL
    const { region } = req.query;                //    e.g. /trainers?region=ny

    // If a region was supplied, filter the list
    if (region) {
        //    Convert each trainer’s region to lowercase
        //    Convert the query value to lowercase
        //    Keep trainers whose region string contains the query substring
        return res.json(
            trainers.filter(t =>
                t.region.toLowerCase().includes(region.toLowerCase())
            )
        );                                        
        //  Respond with the filtered array and exit
    }

    //  No region query -return the full trainers collection
    res.json(trainers);                           
    //    Respond with the entire array (status 200)
});

//     router.get("/:id", …) – creates a handler for GET requests to /trainers/<someId>. 
// trainers.find(...) – searches the in‑memory trainers array for an element whose id 
// if (!trainer) … – if find returns undefined (no match)
// res.json(trainer); – when a trainer is found, send it back as a JSON response; 

// GET /trainers/:id
router.get("/:id", (req, res) => {
    // Look up the trainer whose id matches the value from the URL
    const trainer = trainers.find(t => t.id === Number(req.params.id));

    // If no matching trainer, send 404
    if (!trainer) return res.status(404).json({
        error: "Trainer not found"
    });
// Trainer found - return it as JSON 
    res.json(trainer);
});


// POST /trainers
// if (!req.body.name || !req.body.region) {
// Check two required fields: name and region.
// !req.body.name - true when name is missing, empty, or falsy.
// !req.body.region - true when region is missing, empty, or falsy.
// If either check is true, the condition passes.

router.post("/", (req, res) => {
    if (!req.body.name || !req.body.region) {
        return res.status(400).json({
            error: "Name and region are required"
        });
    }

    // ---------- CREATE A NEW TRAINER ----------
const newTrainer = {
    // id:  if the array already has items, take the last item's id,
    //     add 1 - auto‑increment.  If the array is empty, start at 1.
    id: trainers.length
        ? trainers[trainers.length - 1].id + 1   // <‑ last element → .id → +1
        : 1,

    //  name & region come from the request body 
    name:   req.body.name,
    region: req.body.region
};

trainers.push(newTrainer);                         
//  Append the object to the in‑memory array
// MDN: Array.prototype.push - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push

res.status(201).json(newTrainer);                  
// Respond with HTTP 201 Created + the new object as JSON
// MDN: Response.status → https://developer.mozilla.org/en-US/docs/Web/API/Response/status
// MDN: Response.json   → https://developer.mozilla.org/en-US/docs/Web/API/Response/json

// ---------- UPDATE AN EXISTING TRAINER ----------
router.patch("/:id", (req, res) => {
    // Find the trainer whose numeric id matches the route param
    const trainer = trainers.find(t => t.id === Number(req.params.id));
    // MDN: Array.prototype.find → https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    // MDN: Number() conversion → https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number

    // If not found → 404 Not Found
    if (!trainer) return res.status(404).json({
        error: "Trainer not found"
    });

    // Partial update (PATCH):
    //    Only overwrite the fields that are present in the request body.
    if (req.body.name)   trainer.name   = req.body.name;
    if (req.body.region) trainer.region = req.body.region;

    // Return the updated trainer object
    res.json(trainer);                               // defaults to 200 OK
});

});

export default router;
