SBA 318: 
Express Server Application:

Introduction

This assessment measures your understanding of Node and Express and your capability to implement their features in a practical manner. You have creative freedom in the topic, material, and purpose of the web application you will be developing, so have fun with it! However, remember to plan the scope of your project to the timeline you have been given.

This assessment has a total duration of three (3) days. This is a take-home assessment.

You have three total days (including weekends and holidays) to work on this assessment. This assessment will be due at 5:00pm on the third day after it is assigned. Your instructor will provide you with at least four hours of class time to work on the assessment; during which time, you may discuss details of the project with your instructor, including the topic, scope, and implementation.

Objectives

Create a server application with Node and Express.

Create a RESTful API using Express.

Create Express middleware.

Use Express middleware.

Use a template engine to render views with Express.

Interact with a self-made API through HTML forms.

Submission

Submit the link to your completed assessment using the Start Assignment button on the Assignment page in Canvas.

Your submission should include:

A link to the GitHub repository for your project.

Instructions

You will create a small Node and Express server application. The topic and content of this application is entirely up to you; be creative!

Your work will be graded according to the technical requirements listed in the following section. Creativity and effort always work in your favor, so feel free to go beyond the scope of the listed requirements if you have the time.

Keep things simple. Like most projects you will encounter, you should finish the absolute minimum requirements first, and then add additional features and complexity if you have the time to do so. This will also help you understand what you can get done in a specific allotment of time if you were to be asked to do something similar in the future.

Once you have an idea in mind, briefly discuss it with your instructors to determine if it is appropriate for the amount of time you have been given.

Since topic and content are secondary to functionality for this assessment, we have included some resources below for free content that you can use to populate your application. Once you have gotten your functionality in place, you can return and fill in the content with something interesting.

Resources for free content:

Text: Lipsum, a Lorem Ipsum text generator.

Images: Pexels, a resource for stock photos (and other media).

GIFs: Motion Elements, a resource for GIFs (and other media).

Requirements

The requirements listed here are absolute minimums. Ensure that your application meets these requirements before attempting to further expand your features.

Create your application locally, and initialize a local git repo. Make frequent commits to the repo. When your application is complete, push your repo to GitHub and submit the link to the GitHub page using the submission instructions at the top of this document.

Bonus Objectives

The objectives listed here are not required. Ensure that your application meets the requirements above before attempting to further expand your features.

These bonus objectives cannot increase your overall score above 100%. Successful completion of these objectives can, however, make up for lost points above. Ensure your application works as outlined by the requirements above before attempting these objectives, time permitting.


-------------------------First Step Setup 


This project is a small RESTful API built with Node.js, Express, and EJS.  
I changed my project theme to Pokemon data and organized it into three data categories:

- `trainers`
- `pokemon`
- `types`

The app includes custom middleware, error handling, route parameters, query parameters, a rendered EJS view, a form, and static CSS served with Express.

**Project Setup**

```bash
npm init -y
npm i express ejs
npm i -D nodemon

npm init -y
npm i express ejs
npm i -D nodemon 

created pokemon data(random) /pokemon.js -pokemondata id, name, trainerid, typeid, level

/trainer.js - trainer data  id, name, region

/types.js -type data id, name 

MDN Express intro: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction

Not yet Added!!!Thinking About it
"scripts": {
  "dev": "nodemon app.js"}


Tech Used

Node.js
Express
EJS
JavaScript
CSS

Main Features

Create a basic Express server
Use built-in middleware:
express.json()
express.urlencoded({ extended: true })
express.static()

Use two custom middleware functions
Use error-handling middleware
Create RESTful routes
Use route parameters
Use query parameters for filtering
Render a view using EJS
Serve static CSS from the public folder
Include a form that interacts with the API


Custom Middleware

logger
Logs the request method and URL for each incoming request
Helps with debugging
validateName
Checks POST requests for a required name field
Sends a 400 error if name is missing

----------------------2. Make basic Server app.js

MDN Express intro: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
I used EJS as the template engine.

In app.js:


app.set('view engine', 'ejs');
I created a views folder with index.ejs and rendered it from the root route:


app.get('/', (req, res) => {
  res.render('index');
});

-------------------// 3. Add Middleware for JSON form data and static files

 Make public folder and put style.css 

 MDN forms overview: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form
MDN HTTP messages: https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages
Express static files: https://expressjs.com/en/starter/static-files.html



------------------4. // 2 custom middleware functions
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


MDN functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
Express middleware: https://expressjs.com/en/guide/using-middleware.html


****************************Handle Errors********************

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});




// 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

------------------5. Template Engine - Setup EJS

app.set('view engine', 'ejs'); //app.js

Make  views folder with index.ejs - //HTML 

MDN Express tutorial with views: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data
EJS docs: https://ejs.co/


----------------------6. Make a form views/index.ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/static/style.css" />
    <title>SBA 318 Express Server App</title>
</head>
<body>
    <h1>SBA 318 Express Server Application</h1>
    <form action="/users" method="POST">
        <input type="text" name="name" placeholder="Enter name" />
        <button type="submit">Submit</button>
    </form>
</body>
</html>

Create a routes folder to keep seperste from app.js 
routes/users.js and link to app.js dont forget to export defualt  in user.js to see form and page 

import express from "express";
const router = express.Router();

export default router; - //at the bottom

// Root View in app.js
app.get('/', (req,res) => {
    res.render('index');
})

MDN forms: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form
MDN GET vs POST: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods


---------7. Add one Api route/ form can interact with user.js -

const users = [];

// POST /users make a new user /hopefully its used by form 


router.post('/', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.json(newUser);
});
router.get('/', (req, res) => res.json(users));

MDN POST: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
MDN JSON: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON




-----------8. Add route Parameters 

MDN params idea through URLs/query strings: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL
Express routing: https://expressjs.com/en/guide/routing.html

// GET /users/:id - fetch one user 
// map users/3 whose id=3 

router.get('/users/:id', (req, res) => {

    //convert to number and find match users
    // req.params.id can be used in logic (update,delete)
    const user = users.find(u => u.id === Number(req.params.id));

    // if no 404 
    if (!user) return res.status(404).send('User not found');

    // otherwise return user as JSON
    res.json(user);
});




********Create data/user.js to test get/id change the users id to just id. was getting an error and muted the const users 

router.get('/:id', (req, res) => {

    //convert to number and find match users
    // req.params.id can be used in logic (update,delete)
    const user = users.find(u => u.id === Number(req.params.id));

    // if no 404 
    if (!user) return res.status(404).send('User not found');

    // otherwise return user as JSON
    res.json(user);
});

Ran 4 test 
GET http://localhost:3000/users/2 = returns {"id":2,"name":"Samuel"}

GET http://localhost:3000/users/1 = returns {"id":1,"name":"Susy"}

GET http://localhost:3000/users/3 = returns {"id":3,"name":"Billy"}

GET http://localhost:3000/users/99 → 404 “User not found”



----------9. Query parameters - Add parameters for filtering 

http://localhost:3000/users

# Filter by name 
 http://localhost:3000/users?name=billy



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

MDN URLSearchParams: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
MDN query strings in URLs: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL


10. add one update or delete 


// PATCH /users/:id 
router.patch("/:id", (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));

    // if no 404 
    if (!user) return res.status(404).send('User not found');

    if (req.body.name) user.name = req.body.name;
    // otherwise return user as JSON
    res.json(user);
});




11. Testing if static public works in the css 
Css public/style.css

Css is working add '/static' cause it wasnt working without it 
app.use('/static',express.static("public"));

MDN CSS basics: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics



12. Test everything in the browser and Postman
Check:
/ renders EJS page
form submits to /users
/users lists data
/users/1 uses route param
/users?name=a uses query param
Docs:
MDN HTTP overview: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview