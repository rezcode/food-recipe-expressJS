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

const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, food_video, food_image } = req.body;
    await model.addRecipe({
      title,
      ingredients,
      food_video,
      food_image,
    });
    res.send({
      message: `${title} recipe successfully added`,
      data: { title, ingredients, food_video, food_image },
    });
  } catch (error) {
    res.status(400).send("Something wrong, add recipe failed!");
  }
};

module.exports = { getAllRecipes, addRecipe };
