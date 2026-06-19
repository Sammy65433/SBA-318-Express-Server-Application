// /routes.trainers.js

import express from "express";
import trainers from "../data/trainers.js";
import pokemon from "../data/pokemon.js"

const router = express.Router();


// GET /trainers 
router
    .get("/", (req, res) => {
        const {
            region
        } = req.query;

        if (region) {
            return res.json(trainers.filter(t =>
                t.region.toLowerCase().includes(region.toLowerCase())
            ));
        }
        res.json(trainers);
    });

// GET /trainers/:id
router.get("/:id", (req, res) => {
    const trainer = trainers.find(t => t.id === Number(req.params.id));
    if (!trainer) return res.status(404).json({
        error: "Trainer not found"
    });

    res.json(trainer);
});


// POST /trainers
router.post("/", (req, res) => {
    if (!req.body.name || !req.body.region) {
        return res.status(400).json({
            error: "Name and region are required"
        });
    }

    const newTrainer = {
        id: trainers.length ? trainers[trainers.length - 1].id + 1 : 1,
        name: req.body.name,
        region: req.body.region
    };

    trainers.push(newTrainer);
    res.status(201).json(newTrainer);
});

// PATCH /trainers/:id
router.patch("/:id", (req, res) => {
  const trainer = trainers.find(t => t.id === Number(req.params.id));
  if (!trainer) return res.status(404).json({ error: "Trainer not found" });

  if (req.body.name) trainer.name = req.body.name;
  if (req.body.region) trainer.region = req.body.region;

  res.json(trainer);
});


export default router;