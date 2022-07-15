const Router = require("express").Router();
const controller = require("../controllers/user");
const middleware = require("../middleware/verifyToken");

// Get All Users
Router.get("/", middleware.verifyToken, controller.getAllUser);

// Get User Detail by id
Router.get("/:id", middleware.verifyToken, controller.getUserDetail);

// Get User Detail by email
Router.get("/find/email", middleware.verifyToken, controller.getUserEmail);

// Get User Recipe
Router.get("/find/recipe", controller.getUserRecipe);

// Edit user
Router.patch("/:id", middleware.verifyToken, controller.editUser);

// Delete User
Router.delete("/:id", middleware.verifyToken, controller.deleteUser);

module.exports = Router;
