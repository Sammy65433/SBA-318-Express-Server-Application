
// Make Basic Server app.js
// 1-2
import express from "express";
import usersRouter from './routes/user.js'

const app = express();

const PORT = 3000;


// Test
// app.get("/", (req, res) => {
//     res.send("Hello, Stranger!");
// });

// 5. Template Engine

app.set('view engine', 'ejs');


// 3. Add Middleware for JSON form data and static files

app.use(express.json()); //register express built in json

app.use(express.urlencoded({ // lets you reaad from data in req.body
    extended: true
}));
app.use(express.static("public")); // serves images/CSS from public 



// Mount Router 
app.use('/users', usersRouter); //all /users/user.js


// 4
// Two custom middleware functions
// log http and url of every incoming request
// I see the traffic, and helps with debugging

// Log request then call next
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`); //"GET/users"
    next(); //handle next route
};

// check for POST request to have a name or else 400

// run next if pass call next or else 400
const validateName = (req, res, next) => {

    //only run on POST- ignore other HTTP 
    if (req.method === 'POST' && !req.body.name) {
        return res.status(400).send('Name is required');
    }
    next(); //validite pass go to route handler 
};

// Register middleware 
// Oredered listed (logger 1st, then validation)
app.use(logger);
app.use(validateName);


// 6.Make a form views/index.ejs
// 
// Root View
app.get('/', (req,res) => {
    res.render('index');
})





// 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
