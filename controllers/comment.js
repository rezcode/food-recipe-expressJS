const model = require('../models/comment');

const getRecipeComment = async (req, res) => {
  try {
    const id = parseInt(req.body.id, 10);
    const getData = await model.getRecipeComment(id);

    res.send({
      data: getData.rows,
    });
  } catch (error) {
    res.status(400).send('Something wrong, get recipe comment fail!');
  }
};

module.exports = {
  getRecipeComment,
};
