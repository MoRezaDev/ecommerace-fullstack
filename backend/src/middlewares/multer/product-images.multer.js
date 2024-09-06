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

//for add images to product
const multerSotrageAddImages = multer.diskStorage({
  destination: (req, file, cb) => {
    const { slug } = req.body;
    cb(null, path.join(productTmpPath, "..", "product", slug));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueId = uuidv4();
    cb(null, `${uniqueId}${ext}`);
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

const addProductImages = multer({
  storage: multerSotrageAddImages,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = {
  uploadProductImages,
  uploadProductImageMain,
  addProductImages,
};
