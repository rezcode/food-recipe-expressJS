const model = require("../models/user");

// Get All Users
const getAllUser = async (req, res) => {
  try {
    const getData = await model.getAllUser();
    res.send({
      data: getData.rows,
      totalData: getData.rowCount,
    });
  } catch (error) {
    res.status(400).send("Something wrong, get all users fail!");
  }
};

// Get User Detail by id
const getUserDetail = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getData = await model.getUserDetail(id);

    if (getData.rows == 0) {
      res.send("user not found");
    } else {
      res.send({
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

    res.send({
      data: getData.rows,
    });
  } catch (error) {
    res.status(400).send("Something wrong, get user email fail!");
  }
};

// register user
const registerUser = async (req, res) => {
  try {
    const { name, email, phone_number, password } = req.body;

    await model.registerUser({
      name,
      email,
      phone_number,
      password,
    });
    res.send({
      message: "user added",
      data: { name, email, phone_number, password },
    });
  } catch (error) {
    res.status(400).send("Something wrong, register fail!");
  }
};

// Edit user by id
const editUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, phone_number, password, image_profile } = req.body;

    await model.editUser({
      id,
      name,
      email,
      phone_number,
      password,
      image_profile,
    });
    res.send({ message: `${name} successfully added` });
  } catch (error) {
    res.status(400).send("Something wrong, edit user fail!");
  }
};

// Delete user by id
const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(id);
    await model.deleteUser(id);

    res.send({
      message: `User id ${id} Deleted`,
    });
  } catch (error) {
    res.status(400).send("Something wrong, delete user failed!");
  }
};

module.exports = {
  getAllUser,
  getUserDetail,
  getUserEmail,
  registerUser,
  editUser,
  deleteUser,
};
