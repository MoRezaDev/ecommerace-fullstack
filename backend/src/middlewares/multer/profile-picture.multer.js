const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");

const profilePath = path.join(
  __dirname,
  "..",
  "..",
  "public",
  "profile-picture"
);

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destination = path.join(profilePath, `${req.userId}`);
    if (!req.userId) throw new createHttpError.Forbidden("no user id found");
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile-pic${ext}`);
  },
});

const updateProfilePicMulter = multer({
  storage: multerStorage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = updateProfilePicMulter;
