const autoBind = require("auto-bind");
const authServices = require("./auth.services");

class AuthController {
  #services;
  constructor() {
    autoBind(this);
    this.#services = authServices;
  }

  async login(req, res, next) {
    const { credential } = req.body;
    try {
      const user = await this.#services.login(credential);
      return res
        .cookie("accessToken", user.accessToken, {
          maxAge: 10 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .json({ user: user.user });
    } catch (err) {
      next(err);
    }
  }

  async sendOTP(req, res, next) {
    const { mobile } = req.body;

    try {
      const otp = await this.#services.sendOTP(mobile);
      return res.json({ code: otp.code });
    } catch (err) {
      next(err);
    }
  }

  async checkOTP(req, res, next) {
    const { code, mobile } = req.body;

    try {
      const user = await this.#services.checkOTP(code, mobile);
      return res
        .cookie("accessToken", user.accessToken, {
          maxAge: 10 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .json({ user: user.user });
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    const cookie = req.cookies?.accessToken;
    if (!cookie)
      return res.status(400).json({ message: "there is no user to loged in" });
    return res.clearCookie("accessToken").json({ message: "success logedout" });
  }
}

module.exports = new AuthController();
