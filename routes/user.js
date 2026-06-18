



import express from "express";
const router = express.Router();

// 6. Create a routes folder to keep seperste from app.js 
// routes/users.js and link to app.js dont forget to 
// export defualt  in user.js to see form and page 






const users = [];



// POST /users make a new user /hopefully its used by form 
router.post('/', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.json(newUser);
});

// GET /users 
router.get('/', (req, res) => res.json(users)
);


// 8. Route Parameters - 
// GET /users/:id - fetch one user 

router.get('/users/:id', (req, res) => {

    //convert to number and find match users
    const user = users.find(u => u.id === Number(req.params.id));

    // if no 404 
    if (!user) return res.status(404).send('User not found');

    // otherwise return user as JSON
    res.json(user);
});

export default router;