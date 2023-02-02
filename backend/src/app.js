const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require('dotenv').config();

const app = express();
const routes = require('./routes');
const mongoose = require('./database');

// Use cors middleware to allow cross-origin requests
app.use(cors());

// Use morgan for request logging
app.use(morgan("tiny"));

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(routes);

app.post("/api/example", (req, res) => {
  res.send({
    success: true,
    message: "Example route",
    data: req.body
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});