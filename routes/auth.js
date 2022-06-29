const Router = require("express").Router();
const controller = require("../controllers/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./public/images");
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}_${Math.random()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

Router.post("/login", controller.login);

Router.post("/register", upload.single("imageProfile"), controller.register);

module.exports = Router;
