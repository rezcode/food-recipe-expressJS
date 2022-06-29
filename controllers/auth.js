const modelAuth = require("../models/auth");
const modelUser = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const imageProfile = req.file.path;
    const saltPassword = await bcrypt.genSaltSync(15);
    const hashPassword = await bcrypt.hash(password, saltPassword);
    const checkUserEmail = await modelUser.getUserEmail(email);
    if (checkUserEmail.rowCount === 1) {
      throw new Error("email already exist");
    } else if (Object.values(req.body).includes("")) {
      res.status(401).send("All forms must be filled");
    } else {
      await modelAuth.registerUser({
        name,
        email,
        phoneNumber,
        password: hashPassword,
        imageProfile,
      });
      res.send({
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
    const users = await modelUser.getUserEmail(email);
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
      const jwt = require("jsonwebtoken");
      const token = jwt.sign(users.rows[0], process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      return res.status(200).send(token);
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  login,
  register,
};
