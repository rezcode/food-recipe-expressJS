const express = require("express");
const app = express();
const port = 8000;
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

// import all routes
const userRoute = require("./routes/user");
const recipeRoute = require("./routes/foodRecipe");
const commentRoute = require("./routes/comment");
const authRoute = require("./routes/auth");

// secure express header
app.use(helmet());

// enable all cors request
app.use(cors());

// parse request body menjadi json
app.use(bodyparser.json());
// parse x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static("public"));

// define all Routes
app.use("/users", userRoute);
app.use("/recipes", recipeRoute);
app.use("/comments", commentRoute);
app.use("/auth", authRoute);

// app.use("*", (req, res) => {
//   res.send("Sukses");
// });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
