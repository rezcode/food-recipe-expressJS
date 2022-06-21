const Router = require("express").Router();
const controller = require("../controllers/foodRecipe");

// Get All Recipes
Router.get("/", controller.getAllRecipes);

// Add New Recipe
Router.post("/add", controller.addRecipe);

module.exports = Router;
