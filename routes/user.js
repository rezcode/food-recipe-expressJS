const Router = require('express').Router();
const controller = require('../controllers/user');

// Get All Users
Router.get('/', controller.getAllUser);

// Get User Detail by id
Router.get('/:id', controller.getUserDetail);

// Get User Detail by email
Router.get('/find/email', controller.getUserEmail);

// Register new User
Router.post('/register', controller.registerUser);

// Edit user
Router.put('/:id', controller.editUser);

// Delete User
Router.delete('/:id', controller.deleteUser);

module.exports = Router;
