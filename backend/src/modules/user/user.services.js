const autoBind = require("auto-bind");
const UserModel = require("./user.model");
const createHttpError = require("http-errors");

class UserServices {
  #userModel;
  constructor() {
    autoBind(this);
    this.#userModel = UserModel;
  }

  async checkUserExists(credential) {
    const user = await this.#userModel.findOne({
      $or: [{ mobile: credential }, { _id: credential }],
    });

    if (!user) throw new createHttpError.NotFound("no user found!");

    return user;
  }

  async updateUser(credential) {
    //credential would be mobile number or ID

    const { _id, name, family, address, email, password, mobile } = credential;
    const user = await this.checkUserExists(_id);

    //update if any fields need
    if (name) {
      user.name = name;
    }
    if (family) {
      user.family = family;
    }
    if (address) {
      user.address = address;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    if (mobile) {
      user.mobile = mobile;
    }

    const result = await user.save();
    return result;
  }

  async updateUserProfilePicture(userId, file) {
    const urlPath = `http://localhost:5025/profile-picture/${userId}/${file.filename}`;
    try {
      const user = await this.checkUserExists(userId);
      user.img_url = urlPath;
      const result = await user.save();
      return result.img_url;
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }

  async deleteUserProfilePicture(userId) {
    const user = await this.checkUserExists(userId);

    user.img_url = "";
    const result = await user.save();
    return result.img_url;
  }

  async getUserSession(userId) {
    const user = await this.checkUserExists(userId);
    const newUserObj = user.toObject();
    delete newUserObj.password;
    delete newUserObj.otp;
    return newUserObj;
  }

  async deleteUser(userId) {
    const user = await this.checkUserExists(userId);

    try {
      await user.deleteOne();
    } catch (err) {
      throw new createHttpError.InternalServerError(err);
    }
  }
}

module.exports = new UserServices();
