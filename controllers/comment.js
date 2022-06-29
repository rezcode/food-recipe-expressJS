const model = require("../models/comment");

const getRecipeComment = async (req, res) => {
  try {
    const id = parseInt(req.body.id, 10);
    const getData = await model.getRecipeComment(id);

    res.send({
      data: getData.rows,
    });
  } catch (error) {
    res.status(400).send("Something wrong, get recipe comment fail!");
  }
};

const addCommentRecipe = async (req, res) => {
  try {
    const { comment, idRecipe, idUser } = req.body;
    await model.addCommentRecipe({
      comment,
      idRecipe,
      idUser,
    });
    res.send({
      message: `recipe id ${idRecipe} commended by user id ${idUser} successfully added`,
    });
  } catch (error) {
    res.status(400).send("Something wrong, add comment failed");
  }
};

module.exports = {
  getRecipeComment,
  addCommentRecipe,
};
