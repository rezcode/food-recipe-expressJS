const Router = require('express').Router();
const controller = require('../controllers/comment');

// Get Comment by Recipe
Router.get('/recipe', controller.getRecipeComment);

// Add comment recipe by user
Router.post('/add', controller.addCommentRecipe);

module.exports = Router;
