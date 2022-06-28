const model = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const {  }

const register = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const imageProfile = req.file.path;
    const saltPassword = await bcrypt.genSaltSync(15);
    const hashPassword = await bcrypt.hash(password, saltPassword);
    const checkUserEmail = await model.getUserEmail(email);

    if (checkUserEmail.rowCount === 1) {
      throw new Error("email already exist");
    } else {
      await model.registerUser({
        name,
        email,
        phoneNumber,
        password: hashPassword,
        imageProfile,
      });
      res.json({
        message: "Register user successfully",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await model.getUserEmail(email);
    if (users.rows.length === 0)
      return res.status(401).send({ error: "incorrect email" });

    // Password check
    const validPassword = await bcrypt.compare(
      password,
      users.rows[0].password
    );
    if (!validPassword) {
      return res.status(401).send({ error: "incorrect password" });
    } else {
      return res.status(200).send("Login successfully");
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  login,
  register,
};
