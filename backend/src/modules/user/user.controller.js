const autoBind = require("auto-bind");
const UserModel = require("./user.model");
const userServices = require("./user.services");
const updateProfilePicMulter = require("../../middlewares/multer/profile-picture.multer");
const multer = require("multer");
const createHttpError = require("http-errors");

class UserController {
  #services;
  constructor() {
    autoBind(this);
    this.#services = userServices;
  }

  async updateUser(req, res, next) {
    const { credential } = req.body;
    try {
      const user = this.#services.updateUser(credential);
      return res.json({ message: "update success" });
    } catch (err) {
      next(err);
    }
  }

  async updateUserProfilePicture(req, res, next) {
    try {
      const imgUrl = await this.#services.updateUserProfilePicture(
        req.userId,
        req.file
      );
      return res.json({ imgUrl });
    } catch (err) {
      next(err);
    }
  }

  async getUserSession(req, res, next) {
    try {
      const user = await this.#services.getUserSession(req.userId);
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async updateUserComment(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
