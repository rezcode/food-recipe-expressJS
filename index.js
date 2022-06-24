const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 8000;
const bodyparser = require('body-parser');
const helmet = require('helmet');

// import all routes
const userRoute = require('./routes/user');
const recipeRoute = require('./routes/foodRecipe');
const commentRoute = require('./routes/comment');

// secure express header
app.use(helmet());

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  fileName: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageFilterType = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// parse request body menjadi json
app.use(bodyparser.json());
// parse x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));
// use multer
app.use(multer({
  storage: fileStorage, imageFilterType,
}).single('imageProfile'));

// define all Routes
app.use('/users', userRoute);
app.use('/recipes', recipeRoute);
app.use('/comments', commentRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
