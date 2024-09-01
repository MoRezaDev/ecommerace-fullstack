const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { randomInt } = require("crypto");

class AuthServices {
  #userModel;
  constructor() {
    autoBind(this);
    this.#userModel = UserModel;
  }

  async checkUserExists(credential) {
    if (!credential) throw new createHttpError.Forbidden("no user found");
    const user = await this.#userModel
      .findOne({
        $or: [{ email: credential }, { mobile: credential }],
      })
      .exec();
    if (!user) throw new createHttpError.Forbidden("no user found");
    return user;
  }

  verifyMobileRegex(mobile) {
    const phone = mobile.startsWith("0") ? mobile : "0" + mobile;
    const regex = /^09\d{9}$/;
    if (!regex.test(phone)) {
      throw new createHttpError.BadRequest("mobile format is incorrect");
    } else {
      return phone;
    }
  }

  async login(credential) {
    const user = await this.checkUserExists(credential);

    //create token
    const accessToken = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10d" }
    );
    const newUserObj = { user: { ...user }, accessToken };
    delete newUserObj.user.password;
    return newUserObj;
  }

  async sendOTP(mobile) {
    const verifiedMobile = this.verifyMobileRegex(mobile);
    let user = await this.#userModel.findOne({ mobile: verifiedMobile });
    if (!user) {
      user = await this.#userModel.create({ mobile: verifiedMobile });
    }

    //check otp requests
    const now = Date.now();
    if (user.otp?.expiresIn && user.otp?.expiresIn > now) {
      throw new createHttpError.Forbidden(
        "you just request once every 1 miniute, please try in a few miniutes later"
      );
    }

    const otp = {
      code: randomInt(10000, 99999),
      expiresIn: Date.now() + 60 * 1000,
    };
    user.otp = otp;
    await user.save();
    return otp;
  }

  async checkOTP(code, mobile) {
    const user = await this.checkUserExists(mobile);
    const now = Date.now();
    if (user.otp?.code !== Number(code) || user.otp?.expiresIn < now)
      throw new createHttpError.Forbidden(
        "invalid code or code expired, try to get new code"
      );

    //create token
    const accessToken = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10d" }
    );
    const userObject = user.toObject();
    const newUserObj = { user: userObject, accessToken };
    delete user.otp;
    await user.save();
    delete newUserObj.user.password;
    return newUserObj;
  }
}

module.exports = new AuthServices();
