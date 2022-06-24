const db = require('../config/db');

// Get All Users
const getAllUser = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM users ORDER BY id DESC', (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});

// Get User Detail by id
const getUserDetail = (id) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});

// Get User Detail by email
const getUserEmail = (email) => new Promise((resolve, reject) => {
  db.query(
    'SELECT * FROM users WHERE email ~* $1',
    [email],
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    },
  );
});

// Get User Recipe
const getUserRecipe = (id) => new Promise((resolve, reject) => {
  db.query(
    'SELECT food_recipe.*, users.name, users.image_profile FROM food_recipe LEFT JOIN users ON users.id = food_recipe.user_id WHERE food_recipe.user_id = $1',
    [id],
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    },
  );
});

// Register new user
const registerUser = (props) => {
  const {
    name, email, phoneNumber, password, imageProfile,
  } = props;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users (name, email, phone_number, password, image_profile) VALUES ($1, $2, $3, $4, $5)',
      [name, email, phoneNumber, password, imageProfile],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
};

// Edit User by id
const editUser = (props) => {
  const {
    name, email, phoneNumber, password, imageProfile,
  } = props;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users (name, email, phone_number, password, image_profile) VALUES ($1, $2, $3, $4, $5)',
      [name, email, phoneNumber, password, imageProfile],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
};

// Delete user by id
const deleteUser = (id) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM users WHERE id = $1', [id], (err) => {
    if (err) {
      reject(err);
    } else {
      db.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    }
  });
});

module.exports = {
  getAllUser,
  getUserDetail,
  getUserEmail,
  registerUser,
  editUser,
  deleteUser,
  getUserRecipe,
};
