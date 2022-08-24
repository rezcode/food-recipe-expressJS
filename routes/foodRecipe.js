const Router = require("express").Router();
const controller = require("../controllers/foodRecipe");
const middleware = require("../middleware/verifyToken");
const multerMiddleware = require("../middleware/multer");

// Get All Recipes
Router.get("/", controller.getAllRecipes);

// Get All Popular Recipe
Router.get("/popular", controller.getAllPopularRecipe);

// get Popular by Id
Router.get("/popular/:id", controller.getPopularRecipesById);

// Get Recipe Detail
Router.get("/:id", controller.getRecipeDetail);

// Get Recent 5 Recipe
Router.get("/find/recent", controller.getRecentRecipe);

// Get Recipe Detail by Name
Router.get("/find/name", controller.getRecipeTitle);

// Get all video by Recipe
Router.get("/video/:id", controller.getVideoRecipe);

// Get like recipe by user login
Router.get("/like/:id", controller.getLikeRecipeUser);

// Get save recipe by user login
Router.get("/save/:id", controller.getSaveRecipeUser);

// Add Video Recipe
Router.post("/video/add", middleware.verifyToken, controller.addVideoRecipe);

// Like recipe
Router.post("/like", middleware.verifyToken, controller.likeRecipe);

// Save recipe
Router.post("/save", middleware.verifyToken, controller.saveRecipe);

// Dislike recipe
Router.delete("/dislike/:id", middleware.verifyToken, controller.disLikeRecipe);

// Unsaved recipe
Router.delete("/unsave/:id", middleware.verifyToken, controller.unSavedRecipe);

Router.get("/my/recipe/:id", middleware.verifyToken, controller.getMyRecipe);

Router.get("/my/like/:id", middleware.verifyToken, controller.getMyLikeRecipe);

Router.get("/my/save/:id", middleware.verifyToken, controller.getMySaveRecipe);

Router.post(
  "/add",
  middleware.verifyToken,
  multerMiddleware.single("foodImage"),
  controller.addNewRecipe
);

// Delete Recipe by id
Router.delete("/:id", middleware.verifyToken, controller.deleteRecipe);

// Edit Recipe
Router.patch("/:id", middleware.verifyToken, controller.editRecipe);

module.exports = Router;
