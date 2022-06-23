const Router = require('express').Router();
const controller = require('../controllers/comment');

// Get Comment by Recipe
Router.get('/recipe', controller.getRecipeComment);

module.exports = Router;
