const db = require('../config/db');

const getRecipeComment = (id) => new Promise((resolve, reject) => {
  db.query(
    'SELECT comment.*, food_recipe.title, users.name, users.image_profile FROM comment INNER JOIN users ON users.id = comment.id_user INNER JOIN food_recipe ON food_recipe.id = comment.id_recipe WHERE food_recipe.id = $1',
    [id],
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    },
  );
});

module.exports = {
  getRecipeComment,
};
