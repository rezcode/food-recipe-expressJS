const db = require("../config/db");

// Get All Recipes
const getAllRecipes = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM food_recipe`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

// Get Recipe Detail by id
const getRecipeDetail = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM food_recipe WHERE id = $1`,
      [id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Create new Recipe
const addRecipe = (props) => {
  const { title, ingredients, food_video, food_image, user_id } = props;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO food_recipe (title, ingredients, food_video, food_image, user_id) VALUES ($1, $2, $3, $4, $5)`,
      [title, ingredients, food_video, food_image, user_id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Delete Recipe by id
const deleteRecipe = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM food_recipe WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else resolve(result);
    });
  });
};

module.exports = { getAllRecipes, getRecipeDetail, addRecipe, deleteRecipe };
