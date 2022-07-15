/* eslint-disable radix */
const model = require("../models/user");
require("dotenv").config();

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
    const { name, email, phoneNumber, password, imageProfile } = req.body;

    await model.editUser({
      id,
      name,
      email,
      phoneNumber,
      password,
      imageProfile,
    });
    res.send({ message: `edit ${name} success` });
  } catch (error) {
    res.status(400).send("Something wrong, edit user fail!");
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
