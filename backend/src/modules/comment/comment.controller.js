const autoBind = require("auto-bind");
const commentServices = require("./comment.services");

class CommentController {
  #services;
  constructor() {
    autoBind(this);
    this.#services = commentServices;
  }

  async addCommentController(req, res, next) {
    const { productId, text } = req.body;
    const userId = req.userId;
    try {
      await this.#services.addCommentService(userId, productId, text);
      return res.json({ message: "success!" });
    } catch (err) {
      next(err);
    }
  }

  //Admin
  async editStatusCommentController(req, res, next) {
    const { commentId, status } = req.body;
    try {
      await this.#services.editStatusCommentService(commentId, status);
      return res.json({ message: "success" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CommentController();
