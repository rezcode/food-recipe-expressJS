const db = require("../config/db");

// Get All Users
const getAllUser = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

// Get User Detail by id
const getUserDetail = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

// Get User Detail by email
const getUserEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Register new user
const registerUser = (props) => {
  const { name, email, phone_number, password } = props;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (name, email, phone_number, password) VALUES ($1, $2, $3, $4)`,
      [name, email, phone_number, password],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Edit User by id
const editUser = (props) => {
  const { id, name, email, phone_number, password, image_profile } = props;
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET name = $1, email = $2, phone_number = $3, password = $4, image_profile = $5 WHERE id = $6`,
      [name, email, phone_number, password, image_profile, id],
      (error, result) => {
        if (error) {
          console.log(props.id);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Delete user by id
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllUser,
  getUserDetail,
  getUserEmail,
  registerUser,
  editUser,
  deleteUser,
};
