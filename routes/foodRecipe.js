const Router = require("express").Router();
const controller = require("../controllers/foodRecipe");

// Get All Recipes
Router.get("/", controller.getAllRecipes);

// Get Recipe Detail
Router.get("/:id", controller.getRecipeDetail);

// Add New Recipe
Router.post("/add", controller.addRecipe);

// Delete Recipe by id
Router.delete("/:id", controller.deleteRecipe);

// Edit Recipe

module.exports = Router;
