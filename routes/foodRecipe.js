const Router = require("express").Router();
const controller = require("../controllers/foodRecipe");
const middleware = require("../middleware/verifyToken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./public/recipeAsset/images");
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}_${Math.random()}_${file.originalname}`);
  },
});

// ${Date.now()}_${Math.random()}_${file.originalname}

const upload = multer({ storage });

// Get All Recipes
Router.get("/", controller.getAllRecipes);

Router.get("/popular", controller.getPopularRecipes);

// Get Recipe Detail
Router.get("/:id", controller.getRecipeDetail);

// Get Recent 5 Recipe
Router.get("/find/recent", controller.getRecentRecipe);

// Get Recipe Detail by Name
Router.get("/find/name", controller.getRecipeTitle);

// Add New Recipe
Router.post(
  "/add",
  upload.single("foodImage"),
  middleware.verifyToken,
  controller.addRecipe
);

// Delete Recipe by id
Router.delete("/:id", middleware.verifyToken, controller.deleteRecipe);

// Edit Recipe
Router.patch("/:id", middleware.verifyToken, controller.editRecipe);

module.exports = Router;
