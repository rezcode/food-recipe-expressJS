const db = require("../config/db");

const registerUser = (props) => {
  const { name, email, phoneNumber, password, imageProfile } = props;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (name, email, phone_number, password, image_profile) VALUES ($1, $2, $3, $4, $5)",
      [name, email, phoneNumber, password, imageProfile],
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

module.exports = {
  registerUser,
};
