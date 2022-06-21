const express = require("express");
const app = express();
const port = 8000;
const bodyparser = require("body-parser");
const helmet = require("helmet");

// import all routes
// const allUsers = require("./routes/user");
// const detailUser = require("./routes/user");
const userRoute = require("./routes/user");

// secure express header
app.use(helmet());

// parse request body menjadi json
app.use(bodyparser.json());
// parse x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));

// define all Routes
app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
