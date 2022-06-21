const model = require("../models/foodRecipe");

// Get All Recipes
const getAllRecipes = async (req, res) => {
  try {
    const getData = await model.getAllRecipes();
    res.send({
      data: getData.rows,
      totalData: getData.rowCount,
    });
  } catch (error) {
    res.status(400).send("Something wrong, get all recipes failed!");
  }
};

// Get Recipes Detail
const getRecipeDetail = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getData = await model.getRecipeDetail(id);

    if (getData.rows == 0) {
      res.status(400).send("Food not found");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    res.status(400).send("Something wrong, get recipe detail failed!");
  }
};

// Create New Recipe
const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, food_video, food_image, user_id } = req.body;
    await model.addRecipe({
      title,
      ingredients,
      food_video,
      food_image,
      user_id,
    });
    res.send({
      message: `${title} recipe successfully added`,
      data: { title, ingredients, food_video, food_image, user_id },
    });
  } catch (error) {
    res.status(400).send("Something wrong, add recipe failed!");
  }
};

// Delete Recipe by id
const deleteRecipe = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await model.deleteRecipe(id);

    res.send({
      message: `data recipe with id ${id} successfully deleted`,
    });
  } catch (error) {}
};

module.exports = { getAllRecipes, addRecipe, deleteRecipe, getRecipeDetail };
