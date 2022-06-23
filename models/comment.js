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

const addCommentRecipe = (props) => new Promise((resolve, reject) => {
  const {
    comment,
    idRecipe,
    idUser,
  } = props;
  console.log(props);
  db.query(
    'INSERT INTO comment (comment, id_recipe, id_user) VALUES ($1, $2, $3)',
    [comment, idRecipe, idUser],
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
  addCommentRecipe,
};
