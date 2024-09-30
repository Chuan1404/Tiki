const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../publics/images"));
  },
  filename: (req, file, cb) => {
    const name = Date.now().toString() + "_" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage });
module.exports = upload;