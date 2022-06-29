const Router = require("express").Router();
const controller = require("../controllers/comment");
const middleware = require("../middleware/verifyToken");

// Get Comment by Recipe
Router.get("/recipe", controller.getRecipeComment);

// Add comment recipe by user
Router.post("/add", middleware.verifyToken, controller.addCommentRecipe);

module.exports = Router;
