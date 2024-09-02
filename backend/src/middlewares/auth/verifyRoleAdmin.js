const createHttpError = require("http-errors");
const UserModel = require("../../modules/user/user.model");

const verifyRoleAdmin = async (req, res, next) => {
  //checking user avilability
  const user = await UserModel.findOne({ _id: req.userId }).exec();
  if (!user) throw new createHttpError.BadRequest("no user found!");

  //checking role
  if (user.role !== "admin" || user.role !== "Admin") {
    throw new createHttpError.Forbidden("access denied!");
  }

  next();
};

module.exports = verifyRoleAdmin;
