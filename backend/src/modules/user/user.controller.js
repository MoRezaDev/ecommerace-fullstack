const autoBind = require("auto-bind");
const userServices = require("./user.services");

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
    const img_url = await this.#services.updateUserProfilePicture(
      req.userId,
      req.file
    );
    try {
      res.json({ message: "success", img_url });
    } catch (err) {
      next(err);
    }
  }

  async deleteUserProfilePicture(req, res, next) {
    try {
      const img_url = await this.#services.deleteUserProfilePicture(req.userId);
      return res.json({ message: "deleted successfull", img_url });
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

  async updateUserCard(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  //for Admin....
  async deleteUser(req, res, next) {
    const { userId } = req.body;
    try {
      await this.#services.deleteUser(userId);
      return res.json({ message: "success!" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
