const model = require("../models/comment");

const getRecipeComment = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const getData = await model.getRecipeComment(id);

    res.send({
      data: getData.rows,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addCommentRecipe = async (req, res) => {
  try {
    const { comment, idRecipe, idUser } = req.body;
    if (comment === "") {
      throw "Comment must be filled";
    }
    await model.addCommentRecipe({
      comment,
      idRecipe,
      idUser,
    });
    res.send({
      message: `recipe id ${idRecipe} commended by user id ${idUser} successfully added`,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getRecipeComment,
  addCommentRecipe,
};
