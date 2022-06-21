const express = require("express");
const app = express();
const port = 8000;
const bodyparser = require("body-parser");
const helmet = require("helmet");

// import all routes
const userRoute = require("./routes/user");
const recipeRoute = require("./routes/foodRecipe");

// secure express header
app.use(helmet());

// parse request body menjadi json
app.use(bodyparser.json());
// parse x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));

// define all Routes
app.use("/users", userRoute);
app.use("/recipes", recipeRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
