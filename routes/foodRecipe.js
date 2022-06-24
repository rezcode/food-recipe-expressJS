const Router = require('express').Router();
const controller = require('../controllers/foodRecipe');

// Get All Recipes
Router.get('/', controller.getAllRecipes);

// Get Recipe Detail
Router.get('/:id', controller.getRecipeDetail);

// Get Recent 5 Recipe
Router.get('/find/recent', controller.getRecentRecipe);

// Get Recipe Detail by Name
Router.get('/find/name', controller.getRecipeTitle);

// Add New Recipe
Router.post('/add', controller.addRecipe);

// Delete Recipe by id
Router.delete('/:id', controller.deleteRecipe);

// Edit Recipe
Router.patch('/:id', controller.editRecipe);

module.exports = Router;
