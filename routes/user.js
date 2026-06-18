import express from "express";
import users from "../Data/user.js";

const router = express.Router();

// 6. Create a routes folder to keep seperste from app.js 
// routes/users.js and link to app.js dont forget to 
// export defualt  in user.js to see form and page 





// Create users array




// POST /users make a new user /hopefully its used by form 
router.post('/', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// GET /users 
// router.get('/', (req, res) => res.json(users));


// GET /users?name=...

router.get('/', (req, res) => {
    const {
        name
    } = req.query;  // /users?name=billy


    if (name) {
            const filtered = users.filter(u =>
                u.name.toLowerCase().includes(name.toLowerCase())
            );
                res.json(filtered);
    }
    res.json(users);

});


// 8. Route Parameters - 
// GET /:id - fetch one user 
// map users/3 whose id=3 

router.get('/:id', (req, res) => {

    //convert to number and find match users
    // req.params.id can be used in logic (update,delete)
    const user = users.find(u => u.id === Number(req.params.id));

    // if no 404 
    if (!user) return res.status(404).send('User not found');

    // otherwise return user as JSON
    res.json(user);
});



export default router;