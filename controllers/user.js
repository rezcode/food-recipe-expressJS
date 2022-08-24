/* eslint-disable radix */
const model = require("../models/user");
require("dotenv").config();
const cloudinary = require("../middleware/cloudinary");
const bcrypt = require("bcrypt");

// Get All Users
const getAllUser = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;

    if (page <= 0 || limit <= 0) {
      throw new Error("incorrect page or limit value");
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const data = await model.getAllUser();
    const paginationResult = data.rows.slice(startIndex, endIndex);

    if (paginationResult.length === 0) {
      const getData = await model.getAllUser();
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
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get User Detail by id
const getUserDetail = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getData = await model.getUserDetail(id);

    if (getData.rows.length === 0) {
      res.send("user not found");
    } else {
      res.send({
        message: "Successfully retrieved data",
        data: getData.rows,
      });
    }
  } catch (error) {
    res.status(400).send("Something wrong, get profile fail!");
  }
};

// Get User Detail by email
const getUserEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const getData = await model.getUserEmail(email);
    if (getData.rows.length === 0) {
      res.send("Users not found");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    res.status(400).send("Something wrong, get user email fail!");
  }
};

// Get User Recipe
const getUserRecipe = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const getData = await model.getUserRecipe(id);
    res.send(getData.rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Edit user by id
const editUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, email, phoneNumber, password } = req.body;
    const getData = await model.getUserDetail(id);
    const saltPassword = await bcrypt.genSaltSync(15);
    const hashPassword = await bcrypt.hash(password, saltPassword);
    if (getData.rowCount > 0) {
      let inputName = name || getData?.rows[0]?.name;
      let inputEmail = email || getData?.rows[0]?.email;
      let inputPhoneNumber = phoneNumber || getData?.rows[0]?.phone_number;

      // validation if user does not input password
      if (password === "") {
        inputPassword = password || getData?.rows[0]?.password;
      } else {
        inputPassword = hashPassword || getData?.rows[0]?.password;
      }

      const editUserData = await model.editUser({
        id,
        name: inputName,
        email: inputEmail,
        phoneNumber: inputPhoneNumber,
        password: inputPassword,
      });

      // console.log(editUserData);
      if (editUserData) {
        res.send({
          message: "Edit user successfully",
          data: editUserData.rows[0],
        });
      } else {
        res
          .send(400)
          .send({ message: "Edit user failed", error: error.message });
      }
    } else {
      res.status(404).send("Data user not found");
    }
  } catch (error) {
    res.status(500).send({
      message: "Something wrong, edit user failed",
      error: error.message,
    });
  }
};

// Delete user by id
const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const getData = await model.deleteUser(id);
    if (getData.rowCount === 1) {
      res.send({
        message: `User id ${id} Deleted`,
      });
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    res.status(400).send("Something wrong, delete user failed!");
  }
};

module.exports = {
  getAllUser,
  getUserDetail,
  getUserEmail,
  editUser,
  deleteUser,
  getUserRecipe,
};
