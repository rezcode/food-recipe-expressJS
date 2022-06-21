const db = require("../config/db");

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

const addRecipe = (props) => {
  const { title, ingredients, food_video, food_image } = props;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO food_recipe (title, ingredients, food_video, food_image) VALUES ($1, $2, $3, $4)`,
      [title, ingredients, food_video, food_image],
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

module.exports = { getAllRecipes, addRecipe };
