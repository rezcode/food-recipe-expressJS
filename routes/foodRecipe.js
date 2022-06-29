const Router = require("express").Router();
const controller = require("../controllers/foodRecipe");
const middleware = require("../middleware/verifyToken");

// Get All Recipes
Router.get("/", controller.getAllRecipes);

// Get Recipe Detail
Router.get("/:id", controller.getRecipeDetail);

// Get Recent 5 Recipe
Router.get("/find/recent", controller.getRecentRecipe);

// Get Recipe Detail by Name
Router.get("/find/name", controller.getRecipeTitle);

// Add New Recipe
Router.post("/add", middleware.verifyToken, controller.addRecipe);

// Delete Recipe by id
Router.delete("/:id", middleware.verifyToken, controller.deleteRecipe);

// Edit Recipe
Router.patch("/:id", middleware.verifyToken, controller.editRecipe);

module.exports = Router;
