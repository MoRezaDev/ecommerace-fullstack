const autoBind = require("auto-bind");
const commentServices = require("./comment.services");

class CommentController {
  #services;
  constructor() {
    autoBind(this);
    this.#services = commentServices;
  }

  async addCommentController(req, res, next) {
    const { productId, text, rate } = req.body;
    const userId = req.userId;
    try {
      await this.#services.addCommentService(userId, productId, text, rate);
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

  async removeCommentController(req, res, next) {
    const { commentId } = req.body;
    try {
      await this.#services.removeCommentService(commentId);
      return res.json({ message: "success!" });
    } catch (err) {
      next(err);
    }
  }

  async removeDeniedCommentsController(req, res, next) {
    try {
      const removed_comments =
        await this.#services.removeDeniedCommentsServices();
      return res.json({ message: "success", removed_comments });
    } catch (err) {
      next(err);
    }
  }

  async getDeniedCommentsController(req, res, next) {
    try {
      const denied_comments =
        await this.#services.getDeniedCommentsService();
      return res.json({ message: "success", denied_comments });
    } catch (err) {
      next(err);
    }
  }

  async getPendingCommentsController(req, res, next) {
    try {
      const pending_comments =
        await this.#services.getPendingCommentsServices();
      return res.json({ message: "success", pending_comments });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CommentController();
