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

module.exports = { upload };
