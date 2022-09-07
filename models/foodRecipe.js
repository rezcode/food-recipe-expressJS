/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
const db = require("../config/db");

// Get All Recipes
const getAllRecipes = () =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT food_recipe.id, food_recipe.title, food_recipe.ingredients, food_recipe.food_image, food_recipe.user_id, category_recipe.category, users.name
    FROM food_recipe
    INNER JOIN category_recipe
    ON food_recipe.id_category = category_recipe.id
    INNER JOIN users
    ON food_recipe.user_id = users.id
    ORDER BY food_recipe.id DESC`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });

const getMyRecipe = (id) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT F.*, C.category FROM food_recipe F INNER JOIN category_recipe C ON F.id_category = C.id WHERE user_id = $1`,
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

const getMySaveRecipe = (id) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT S.*, R.title, R.food_image, C.category
      FROM saves S 
      LEFT JOIN food_recipe R ON S.id_recipe = R.id
      LEFT JOIN category_recipe C ON R.id_category = C.id
      WHERE S.id_user = $1`,
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

const getMyLikeRecipe = (id) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT L.*, R.title, R.food_image, R.ingredients, C.category
      FROM likes L 
      LEFT JOIN food_recipe R ON L.id_recipe = R.id
      LEFT JOIN category_recipe C ON R.id_category = C.id
      WHERE L.id_user = $1`,
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

// Get all Popular Recipe
const getAllPopularRecipe = () =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT A.id_recipe, B.title, B.ingredients, B.food_image, C.category, COUNT(*) AS total, null As "isLike", null AS "isSave" FROM likes A
      INNER JOIN food_recipe B ON A.id_recipe = B.id 
      INNER JOIN category_recipe C ON B.id_category = C.id
      GROUP BY A.id_recipe, B.title, B.ingredients, B.food_image, C.category`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });

// Get Popular Recipe by id
const getPopularRecipesById = (id) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT F.*, L.id_user AS "isLike", S.id_user AS "isSave" FROM (SELECT A.id_recipe, B.title, B.ingredients, B.food_image, C.category, COUNT(*) AS total FROM likes A
      INNER JOIN food_recipe B ON A.id_recipe = B.id 
      INNER JOIN category_recipe C ON B.id_category = C.id
      GROUP BY A.id_recipe, B.title, B.ingredients, B.food_image, C.category 
      ORDER BY total DESC) F
LEFT JOIN (SELECT * FROM likes A LEFT JOIN users U ON A.id_user = U.id WHERE U.id = $1) L ON L.id_recipe = F.id_recipe
LEFT JOIN (SELECT * FROM saves A LEFT JOIN users U ON A.id_user = U.id WHERE U.id = $1) S ON S.id_recipe = F.id_recipe`,
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

// Get Recipe Detail by id
const getRecipeDetail = (id) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT food_recipe.id, food_recipe.title, food_recipe.ingredients, food_recipe.food_image, category_recipe.category, food_recipe.user_id, users.name AS recipe_owner
      FROM food_recipe
      INNER JOIN category_recipe
      ON food_recipe.id_category = category_recipe.id
      INNER JOIN users
      ON food_recipe.user_id = users.id
      WHERE food_recipe.id = $1`,
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

// Get video by recipe
const getVideoRecipe = (id) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM video_recipe WHERE id_recipe = $1`,
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

// Add video recipe
const addVideoRecipe = (props) => {
  const { id_recipe, id_user, video_link, video_desc } = props;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO video_recipe (id_recipe, id_user, video_link, video_desc) 
      VALUES ($1, $2, $3, $4)`,
      [id_recipe, id_user, video_link, video_desc],
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

// get like recipe by user login
const getLikeRecipeUser = (id) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM likes
      WHERE id_user = $1`,
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

// like recipe
const likeRecipe = (props) => {
  const { id_user, id_recipe } = props;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO likes (id_user, id_recipe) VALUES ($1, $2) RETURNING id`,
      [id_user, id_recipe],
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

// dislike recipe
const disLikeRecipe = (id) =>
  new Promise((resolve, reject) => {
    db.query("DELETE FROM likes WHERE id = $1", [id], (error, result) => {
      if (error) {
        reject(error);
      } else resolve(result);
    });
  });

// unsaved recipe
const unSavedRecipe = (id) =>
  new Promise((resolve, reject) => {
    db.query("DELETE FROM saves WHERE id = $1", [id], (error, result) => {
      if (error) {
        reject(error);
      } else resolve(result);
    });
  });

// get save recipe by user login
const getSaveByUser = (id) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM saves
      WHERE id_user = $1`,
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

// save recipe
const saveRecipe = (props) => {
  const { id_user, id_recipe } = props;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO saves (id_user, id_recipe) VALUES ($1, $2) RETURNING id`,
      [id_user, id_recipe],
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
  getAllPopularRecipe,
  getPopularRecipesById,
  getRecipeDetail,
  addRecipe,
  deleteRecipe,
  editRecipe,
  getRecipeTitle,
  getRecentRecipe,
  getVideoRecipe,
  addVideoRecipe,
  getLikeRecipeUser,
  getSaveByUser,
  likeRecipe,
  disLikeRecipe,
  saveRecipe,
  unSavedRecipe,
  getMyRecipe,
  getMySaveRecipe,
  getMyLikeRecipe,
};
