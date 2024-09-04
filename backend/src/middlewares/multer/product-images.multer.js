const multer = require("multer");
const path = require("path");
const uuidv4 = require("uuid").v4;

const productTmpPath = path.join(
  __dirname,
  "..",
  "..",
  "public",
  "product-tmp"
);

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, productTmpPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = uuidv4();
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

//for main image
const multerStorageMain = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, productTmpPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = uuidv4();

    cb(null, `main-${uniqueSuffix}${ext}`);
  },
});

const uploadProductImages = multer({
  storage: multerStorage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

const uploadProductImageMain = multer({
  storage: multerStorageMain,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = { uploadProductImages, uploadProductImageMain };
