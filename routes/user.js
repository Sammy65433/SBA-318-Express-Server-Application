
import express from "express";
const router = express.Router();


const users = [];

// app.get('/', (req,res) => {
//     res.render('index');
// })

// POST /users make a new user /hopefully its used by form 
router.post('/', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.json(newUser);
});
router.get('/', (req, res) => res.json(users));

export default router;