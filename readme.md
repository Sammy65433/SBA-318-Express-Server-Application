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


***********************First Step Setup

This project is a small RESTful API built with Node.js, Express, and EJS.

I changed the project theme to Pokemon data and organized it into three main categories:

- `trainers`
- `pokemon`
- `types`

The app includes:

- custom middleware
- error handling
- route parameters
- query parameters
- a rendered EJS view
- a form
- static CSS served with Express

*****************************Project Setup

Install dependencies:

```bash
npm init -y
npm install express ejs
npm install -D nodemon


MDN Express intro: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction

Not yet Added!!!Thinking About it
"scripts": {
  "dev": "nodemon app.js"}


I created separate data files for each category:

pokemon.js
stores pokemon data:
id
name
trainerId
typeId
level

trainers.js
stores trainer data:
id
name
region

types.js
stores type data:
id
name


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



**************************Basic Server Setup

In app.js, I created a basic Express server and listened on a port:


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
I also used EJS as the template engine:


app.set("view engine", "ejs");
Then I created a views folder with an index.ejs file and rendered it from the root route:


app.get("/", (req, res) => {
  res.render("index");
});


Middleware Setup

I added middleware for:

JSON request bodies
form data
static files
Example:


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
I also created a public folder and placed style.css inside it.

*************************Custom Middleware

logger

Logs the request method and URL for every incoming request
Helps with debugging

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
validateName

Checks POST requests for a required name field
Sends a 400 error if name is missing

const validateName = (req, res, next) => {
  if (req.method === "POST" && !req.body.name) {
    return res.status(400).send("Name is required");
  }
  next();
};
Middleware Registration

I registered the middleware in this order:


app.use(logger);
app.use(validateName);
This means:

logger runs first
validateName runs after it


MDN functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
Express middleware: https://expressjs.com/en/guide/using-middleware.html


****************************Handle Errors********************
Error Handling

I added middleware to handle missing routes and server errors.

Request logging before route handling:


app.use((req, res, next) => {
  console.log("Received request", req.method, req.originalUrl);
  next();
});
404 route handler:


app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});
General error-handling middleware:


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Server error"
  });
});
Template Engine Setup

I used EJS for server-side rendering.

In app.js:


app.set("view engine", "ejs");
Then I created a views folder with index.ejs.

Root route:


app.get("/", (req, res) => {
  res.render("index");
});
Why I Used EJS

EJS lets me render dynamic HTML from the server. It helps connect Express routes with a front-end page more easily.

MDN REF
MDN Express introduction:
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
MDN Forms overview:
https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form
MDN HTTP messages:
https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages
Express static files:
https://expressjs.com/en/starter/static-files.html
Express middleware:
https://expressjs.com/en/guide/using-middleware.html
MDN JavaScript functions:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
MDN Express tutorial with views:
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data
EJS documentation:
https://ejs.co/

----------------------6. Make a form views/index.ejs


SBA 318 Express Server App

This is a simple front-end homepage for an Express server project.
It connects to a Pokemon API with routes for trainers, pokemon, and types.

Purpose

This page gives users a basic interface to:

- add a new trainer
- add a new pokemon
- view all trainers
- view all pokemon
- view all types

Files used

- `index.html`
- `/static/style.css`

What the page includes

1. Title Section
   - Displays the project name:
     - `SamuelJ - SBA 318 Express Server Application`
   - Includes a subtitle:
     - `Pokemon API with Trainers, Pokemon, and Types`

2. Add a Trainer Form
   - Sends a `POST` request to `/trainers`
   - Includes:
     - `name`
     - `region`

3. Add a Pokemon Form
   - Sends a `POST` request to `/pokemon`
   - Includes:
     - `name`
     - `trainerId`
     - `typeId`
     - `level`

4. View Data Links
   - `GET /trainers`
   - `GET /pokemon`
   - `GET /types`

How it works

- The `<form>` element collects user input
- The `action` attribute tells the form where to send the data
- The `method="POST"` sends the form data to the Express server
- The links use `GET` requests to display stored data

Route connections

Trainer form:
- `POST /trainers`

Pokemon form:
- `POST /pokemon`

View links:
- `GET /trainers`
- `GET /pokemon`
- `GET /types`

Example usage

Add a trainer:
- Enter trainer name
- Enter region
- Click `Add Trainer`

Add a pokemon:
- Enter pokemon name
- Enter trainer ID
- Enter type ID
- Enter level
- Click `Add Pokemon`

View stored data:
- Click one of the links in the `View Data` section

Important note

This HTML page depends on the Express backend being running.
If the server is not running, the forms and links will not work.


Styling

The page links to this stylesheet:

```html
<link rel="stylesheet" href="/static/style.css" />





Create a routes folder to keep seperste from app.js 
routes/user.js and link to app.js dont forget to export defualt  in user.js to see form and page 
routes/pokemon.js
routes/trainers.js
routes/type.js

***************************************Express Trainers Routes

This file defines the `/trainers` API routes for an Express server using an in-memory `trainers` array.

Files used:
- `routes/trainers.js`
- `data/trainers.js`

What this route does

1. `GET /trainers`
   - Returns all trainers
   - Example:
     - `http://localhost:3000/trainers`

2. `GET /trainers?region=...`
   - Returns only trainers whose `region` matches the query
   - Filtering is case-insensitive
   - Example:
     - `http://localhost:3000/trainers?region=kanto`

3. `GET /trainers/:id`
   - Returns one trainer by `id`
   - Example:
     - `http://localhost:3000/trainers/5`

4. `POST /trainers`
   - Creates a new trainer
   - Requires:
     - `name`
     - `region`
   - Example request body:
   ```json
   {
     "name": "Ash",
     "region": "Kanto"
   }


********************************Pokemon Routes

This file contains the Express routes for handling pokemon data in the API.

The pokemon routes allow the user to:

- view all pokemon
- filter pokemon by type, trainer, or name
- view one pokemon by id
- create a new pokemon
- update an existing pokemon

Routes Included

1. `GET /pokemon`
   - Returns all pokemon
   - Can also filter using query parameters

Examples:
- `/pokemon`
- `/pokemon?typeId=2`
- `/pokemon?trainerId=1`
- `/pokemon?name=char`
- `/pokemon?typeId=2&trainerId=1`

2. `GET /pokemon/:id`
   - Returns one pokemon by its id

Example:
- `/pokemon/3`

3. `POST /pokemon`
   - Creates a new pokemon
   - Required fields:
     - `name`
     - `trainerId`
     - `typeId`
   - Optional field:
     - `level`

Example body:
```json
{
  "name": "Pikachu",
  "trainerId": 1,
  "typeId": 4,
  "level": 12
}

PATCH /pokemon/:id
Updates an existing pokemon
Only updates the fields included in the request body
Example body:


{
  "level": 25
}

use route parameters with req.params
use query parameters with req.query
use request body data with req.body
validate user input
return proper HTTP status codes
create and update in-memory data

Array.filter() is used to narrow down pokemon results
Array.find() is used to locate one pokemon by id
Array.push() is used to add a new pokemon
Number() is used to convert strings from requests into numbers
res.json() sends data back as JSON

Status Codes Used

200 OK for successful GET and PATCH requests
201 Created for successful POST requests
400 Bad Request when required fields are missing
404 Not Found when a pokemon id does not exist





******************************Types Routes

This file contains the Express routes for handling pokemon type data.

The types routes allow the user to:

- view all pokemon types
- view one type by id
- view all pokemon that belong to a specific type

Routes Included

1. `GET /types`
   - Returns all pokemon types

Example:
- `/types`

2. `GET /types/:id`
   - Returns one type by its id

Example:
- `/types/1`

3. `GET /types/:id/pokemon`
   - Returns all pokemon that belong to a specific type

Example:
- `/types/1/pokemon`

Why This Route File Exists

This route file was created to organize and expose the `types` data in the API.

It demonstrates how to:

- create RESTful routes with Express
- use route parameters with `req.params`
- search data with `Array.find()`
- filter related data with `Array.filter()`
- connect one resource to another resource

How It Works

- `res.json(types)` sends the full types array
- `Array.find()` searches for one type by id
- `Array.filter()` returns all pokemon whose `typeId` matches the type id from the route
- `Number(req.params.id)` converts the route parameter from a string into a number

Status Codes Used

- `200 OK` for successful requests
- `404 Not Found` if a type id does not exist



Example Tests

Get all types:
- `GET http://localhost:3000/types`

Get one type:
- `GET http://localhost:3000/types/2`

Get all pokemon for one type:
- `GET http://localhost:3000/types/2/pokemon`

Why `/types/:id/pokemon` Matters

This route shows the relationship between `types` and `pokemon`.

For example:
- if a type has `id = 2`
- and several pokemon have `typeId = 2`
- this route returns only those pokemon

This is useful because it shows how related data can be grouped and accessed through the API.


Why i am are doing this:

You are creating routes for the types resource in your RESTful API.
This lets users view all types, view one type, and view all pokemon connected to one type.
You are practicing how different pieces of data relate to each other.
You are learning route parameters like req.params.id.
You are showing that one resource can connect to another resource, like types connecting to pokemon.





Requirements

Create a Node/Express server	
**** Implemented (app.js, app.listen)

Build a RESTful API	
******* Routes for /trainers, /pokemon, /types (GET, POST, PATCH, query/params)

Create Express middleware	
****** logger and validateName (custom)

Use built‑in middleware	
******* express.json(), express.urlencoded(), express.static()

Use a template engine (EJS)	
******* app.set("view engine","ejs"), views/index.ejs rendered

Interact with self‑made API via HTML forms	
******* Forms in index.ejs POST to /trainers and /pokemon

Three distinct data collections	
******* trainers, pokemon, types (in‑memory data files)

No external API keys required	
******* Confirmed in README and meeting notes

Git repo with frequent commits	
*********11commits
