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
    let filename;

    if (file.fieldname === "primaryImage") {
      // Handle primary image file naming
      filename = `primary-${uniqueSuffix}${ext}`;
    } else {
      // Handle other images
      filename = `${uniqueSuffix}${ext}`;
    }

    cb(null, filename);
  },
});

const updateProductImages = multer({
  storage: multerStorage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = updateProductImages;
