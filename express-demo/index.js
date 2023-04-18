const express = require("express");

// joi is the package (class) that is used to validate our input in requests
const Joi = require("joi");
const app = express();

// This is to use the express.json() middleware service to enable our app parse json values
app.use(express.json());

let courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send({ name: "John " });
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
  res.end();
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with provided ID not found!");
  res.send(course);
});

// Post Request
app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  // validate the request
  const { error } = validateCourse(course);

  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  courses.push(course);
  res.send(course);
  res.send(`Course added successfully! ${course.id}`);
});

// Put Request
app.put("/api/courses/:id", (req, res) => {
  // check the id that item exist
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with provided ID not found!");

  // validate the req
  const { error } = validateCourse(course);

  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  // update the data
  course.name = req.body.name;

  // send res
  res.send(course);
});

// validator function for req inputs
function validateCourse(course) {
  const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

//  Delete Request
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with provided ID not found!");

  courses = courses.filter((c) => c.id !== parseInt(req.params.id));
  res.send("course deleted with id: " + req.params.id);
  res.send(courses);
});

// nodemon is a utility that will monitor for any changes in your source and automatically restart your server. install it using: npm i nodemon -g
// run the server using: nodemon index.js

//  PORT environment variable is used by Node to tell our app what port to listen on
// if the PORT environment variable is not set, we will use port 3000
// one can set the PORT environment variable using: export PORT=5000 or set PORT=5000 on windows
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
