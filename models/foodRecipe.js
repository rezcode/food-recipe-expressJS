const db = require("../config/db");

// Get All Recipes
const getAllRecipes = () =>
  new Promise((resolve, reject) => {
    db.query("SELECT * FROM food_recipe ORDER BY id DESC", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

// Get 6 recent recipe
const getRecentRecipe = () =>
  new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM food_recipe ORDER BY id DESC LIMIT 6",
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });

// Get Popular Recipe
const getPopularRecipes = () =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT A.id_recipe, B.title, B.ingredients, B.food_image, C.category, COUNT(*) AS total FROM likes A
      INNER JOIN food_recipe B ON A.id_recipe = B.id 
      INNER JOIN category_recipe C ON B.id_category = C.id
      GROUP BY A.id_recipe, B.title, B.ingredients, B.food_image, C.category 
      ORDER BY total DESC LIMIT 6`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });

// Get Recipe Detail by id
const getRecipeDetail = (id) =>
  new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM food_recipe WHERE id = $1",
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

// Get Recipe Detail by name
const getRecipeTitle = (title) =>
  new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM food_recipe WHERE title ~* $1",
      [title],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });

// Create new Recipe
const addRecipe = (props) => {
  const { title, ingredients, foodImage, id_user, id_category } = props;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO food_recipe (title, ingredients, food_image, user_id, id_category) VALUES ($1, $2, $3, $4, $5)",
      [title, ingredients, foodImage, id_user, id_category],
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
const deleteRecipe = (id) =>
  new Promise((resolve, reject) => {
    db.query("DELETE FROM food_recipe WHERE id = $1", [id], (error, result) => {
      if (error) {
        reject(error);
      } else resolve(result);
    });
  });

// edit recipe by id
const editRecipe = (props) => {
  const { title, ingredients, foodVideo, foodImage, id } = props;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE food_recipe SET title = $1, ingredients = $2, food_video = $3, food_image = $4 WHERE id = $5",
      [title, ingredients, foodVideo, foodImage, id],
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

module.exports = {
  getAllRecipes,
  getPopularRecipes,
  getRecipeDetail,
  addRecipe,
  deleteRecipe,
  editRecipe,
  getRecipeTitle,
  getRecentRecipe,
};
