const model = require("../models/comment");

const getRecipeComment = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const getData = await model.getRecipeComment(id);

    if (getData.rows.length > 0) {
      res.send({
        message: "success",
        data: getData.rows,
      });
    } else {
      res.send({
        message: "No comment yet",
        data: getData.rows,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Something wrong, get comment failed!",
      error: error.message,
    });
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
