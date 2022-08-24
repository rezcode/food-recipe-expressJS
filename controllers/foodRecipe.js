const model = require("../models/foodRecipe");
const cloudinary = require("../middleware/cloudinary");

// Get All Recipes
const getAllRecipes = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;

    if (page <= 0 || limit <= 0) {
      throw new Error("incorrect page or limit value");
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const data = await model.getAllRecipes();
    const paginationResult = data.rows.slice(startIndex, endIndex);

    if (paginationResult.length === 0) {
      const getData = await model.getAllRecipes();
      if (getData.rows.length === 0) {
        res.send({ message: "no data" });
      } else {
        res.send({
          message: "Success",
          data: getData.rows,
          totalData: getData.rowCount,
        });
      }
    } else {
      res.send({ data: paginationResult, totalData: paginationResult.length });
    }
    // const getData = await model.getAllRecipes();
    // res.send({
    //   data: getData.rows,
    //   totalData: getData.rowCount,
    // });
  } catch (error) {
    res.status(400).send("Something wrong, get all recipes failed!");
  }
};

const getAllPopularRecipe = async (req, res) => {
  try {
    const getData = await model.getAllPopularRecipe();
    res.send({
      data: getData.rows,
      totalData: getData.rowCount,
    });
    if (getData?.rowCount.length === 0) {
      return res.status(401).send("Not found");
    }
  } catch (error) {
    res.status(500).send({
      message: "failed get all popular recipes",
      error: error.message,
    });
  }
};

const getPopularRecipesById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const getData = await model.getPopularRecipesById(id);
    res.send({
      data: getData.rows,
      totalData: getData.rowCount,
    });
    if (getData?.rowCount.length === 0) {
      return res.status(401).send("Not found");
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: "failed get popular recipes by id",
      error: error.message,
    });
  }
};

// Get Recipes Detail by id
const getRecipeDetail = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const getData = await model.getRecipeDetail(id);

    if (getData.rows.length === 0) {
      res.status(400).send("Food not found");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).send("Something wrong, get recipe detail failed!");
  }
};

// Get like recipe by user login
const getLikeRecipeUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const getData = await model.getLikeRecipeUser(id);

    if (getData.rows.length === 0) {
      res.status(400).send("This user never like any recipe");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Something wrong, get like recipe by user failed",
      error: error.message,
    });
  }
};

// Get save recipe by user login
const getSaveRecipeUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const getData = await model.getSaveByUser(id);

    if (getData.rows.length === 0) {
      res.status(400).send("This user never save any recipe");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Something wrong, get save recipe by user failed",
      error: error.message,
    });
  }
};

// Get 5 recent recipe
const getRecentRecipe = async (req, res) => {
  try {
    const getData = await model.getRecentRecipe();
    res.send({
      data: getData.rows,
      totalData: getData.rowCount,
    });
  } catch (error) {
    res.status(400).send("Something wrong, get limit 5 recent recipe railed!");
  }
};

// Get Recipe Detail by title
const getRecipeTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const getData = await model.getRecipeTitle(title);

    res.send({
      data: getData.rows,
    });
  } catch (error) {
    res.status(400).send("Something wrong, get recipe title failed!");
  }
};

// Get Video by Recipe
const getVideoRecipe = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getData = await model.getVideoRecipe(id);

    if (getData.rows.length === 0) {
      res.status(200).send({
        message: "This recipe has no video from the owner",
        data: getData.rows,
      });
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "get all video by recipe failed",
      error: error.message,
    });
  }
};

// Add Video Recipe
const addVideoRecipe = async (req, res) => {
  try {
    const { id_recipe, id_user, video_link, video_desc } = req.body;
    await model.addVideoRecipe({
      id_recipe,
      id_user,
      video_link,
      video_desc,
    });
    res.send({
      message: `video successfully added`,
      data: {
        id_recipe,
        id_user,
        video_link,
        video_desc,
      },
    });
  } catch (error) {
    res.status(400).send({ message: "add video failed", error: error.message });
  }
};

// Delete Recipe by id
const deleteRecipe = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await model.deleteRecipe(id);

    res.send({
      message: `recipe id ${id} successfully deleted`,
    });
  } catch (error) {
    res.status(400).send("Something wrong, delete recipe failed!");
  }
};

// edit recipe
const editRecipe = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, ingredients, foodVideo, foodImage } = req.body;

    await model.editRecipe({
      id,
      title,
      ingredients,
      foodVideo,
      foodImage,
    });
    res.send({ message: `edit ${title} recipe success` });
  } catch (error) {
    res.status(400).send("Something wrong, edit recipe failed!");
  }
};

// like recipe
const likeRecipe = async (req, res) => {
  try {
    const { id_user, id_recipe } = req.body;
    const idLike = await model.likeRecipe({
      id_user,
      id_recipe,
    });
    res.send({
      message: `like successfully`,
      data: {
        idLike,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: "Something wrong, like recipe failed",
      error: error.message,
    });
  }
};

// dislike recipe
const disLikeRecipe = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await model.disLikeRecipe(id);

    res.send({
      message: `recipe id ${id} disliked`,
    });
  } catch (error) {
    res.status(400).send({
      message: "Something wrong, dislike recipe failed",
      error: error.message,
    });
  }
};

// save recipe
const saveRecipe = async (req, res) => {
  try {
    const { id_user, id_recipe } = req.body;
    const idLike = await model.saveRecipe({
      id_user,
      id_recipe,
    });
    res.send({
      message: `save recipe successfully`,
      data: {
        idLike,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: "Something wrong, save recipe failed",
      error: error.message,
    });
  }
};

// unsaved recipe
const unSavedRecipe = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await model.unSavedRecipe(id);

    res.send({
      message: `recipe id ${id} unsaved`,
    });
  } catch (error) {
    res.status(400).send({
      message: "Something wrong, unsave recipe failed",
      error: error.message,
    });
  }
};

const getMyRecipe = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const getData = await model.getMyRecipe(id);

    if (getData.rows.length === 0) {
      res.status(400).send("Food not found");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something wrong, get my recipe failed!");
  }
};

const getMyLikeRecipe = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const getData = await model.getMyLikeRecipe(id);

    if (getData.rows.length === 0) {
      res.status(400).send("Food not found");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).send("Something wrong, get my like recipe failed!");
  }
};

const getMySaveRecipe = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const getData = await model.getMySaveRecipe(id);

    if (getData.rows.length === 0) {
      res.status(400).send("Food not found");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).send("Something wrong, get my save recipe failed!");
  }
};

const addNewRecipe = async (req, res) => {
  try {
    const { title, ingredients, id_category, id_user } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    const foodImage = result?.url;
    await model.addRecipe({
      title,
      ingredients,
      foodImage,
      id_user,
      id_category,
    });
    res.send({
      message: `${title} recipe successfully added`,
      data: {
        title,
        ingredients,
        foodImage,
        id_user,
        id_category,
      },
    });
  } catch (error) {
    res
      .status(400)
      .send({ message: "add recipe failed", error: error.message });
  }
};

module.exports = {
  getAllRecipes,
  getAllPopularRecipe,
  getPopularRecipesById,
  getVideoRecipe,
  deleteRecipe,
  getRecipeDetail,
  editRecipe,
  getRecipeTitle,
  getRecentRecipe,
  addVideoRecipe,
  getLikeRecipeUser,
  getSaveRecipeUser,
  likeRecipe,
  disLikeRecipe,
  saveRecipe,
  unSavedRecipe,
  getMyRecipe,
  getMyLikeRecipe,
  getMySaveRecipe,
  addNewRecipe,
};
