/* eslint-disable radix */
const model = require('../models/user');

// Get All Users
const getAllUser = async (req, res) => {
  try {
    const getData = await model.getAllUser();
    res.send({
      data: getData.rows,
      totalData: getData.rowCount,
    });
  } catch (error) {
    res.status(400).send('Something wrong, get all users fail!');
  }
};

// Get User Detail by id
const getUserDetail = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getData = await model.getUserDetail(id);

    if (getData.rows.length === 0) {
      res.send('user not found');
    } else {
      res.send({
        message: 'Successfully retrieved data', data: getData.rows,
      });
    }
  } catch (error) {
    res.status(400).send('Something wrong, get profile fail!');
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
    res.status(400).send('Something wrong, get user email fail!');
  }
};

// Get User Recipe
const getUserRecipe = async (req, res) => {
  try {
    const id = parseInt(req.body.id, 10);
    const getData = await model.getUserRecipe(id);
    res.send({
      data: getData.rows,
    });
  } catch (error) {
    res.status(400).send('Something wrong, get user recipe fail!');
  }
};

// register user
const registerUser = async (req, res) => {
  try {
    const {
      name, email, phoneNumber, password,
    } = req.body;
    const imageProfile = req.file.path;
    const checkUserEmail = await model.getUserEmail(email);
    if (checkUserEmail.rowCount === 1) {
      res.send('email already exist');
    } else {
      await model.registerUser({
        name,
        email,
        phoneNumber,
        password,
        imageProfile,
      });
      console.log(req.body);
      res.send({
        message: 'user added',
        data: {
          name, email, phoneNumber, password, imageProfile,
        },
      });
    }
  } catch (error) {
    res.status(400).send('Something wrong, register fail!');
  }
};

// Edit user by id
const editUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const {
      name, email, phoneNumber, password, imageProfile,
    } = req.body;

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
    res.status(400).send('Something wrong, edit user fail!');
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
      res.status(404).send('user not found');
    }
  } catch (error) {
    res.status(400).send('Something wrong, delete user failed!');
  }
};

module.exports = {
  getAllUser,
  getUserDetail,
  getUserEmail,
  registerUser,
  editUser,
  deleteUser,
  getUserRecipe,
};
