const autoBind = require("auto-bind");
const productServices = require("../product/product.services");
const CommentModel = require("./comment.model");
const createHttpError = require("http-errors");

class CommentServices {
  #commentModel;
  #productServices;
  constructor() {
    autoBind(this);
    this.#commentModel = CommentModel;
    this.#productServices = productServices;
  }

  async checkCommentExists(commentId) {
    const comment = await this.#commentModel.findById(commentId);
    if (!comment) throw new createHttpError.NotFound("no comment found!");
    return comment;
  }

  async addCommentService(userId, productId, text, rate) {
    const product = await this.#productServices.checkExistsProduct(productId);
    const newComment = await this.#commentModel.create({
      text,
      product: productId,
      user: userId,
      rate,
    });
    product.comments.push(newComment._id);
    await product.save();
  }

  //Admin
  async editStatusCommentService(commentId, status) {
    const comment = await this.checkCommentExists(commentId);
    comment.status = status;
    await comment.save();
    return comment;
  }

  async removeCommentService(commentId) {
    const comment = await this.checkCommentExists(commentId);
    await comment.deleteOne();
  }

  async removeDeniedCommentsServices() {
    const removedDeniedComments = await this.#commentModel.deleteMany({
      status: "denied",
    });
    return removedDeniedComments;
  }

  async getDeniedCommentsService() {
    const comments = await this.#commentModel.find({
      status: "denied",
    });
    if (!comments || comments.length === 0) {
      throw new createHttpError.NotFound("no comments found!");
    }
    return comments;
  }

  async getPendingCommentsServices() {
    const comments = await this.#commentModel.find({
      status: "pending",
    });
    if (!comments || comments.length === 0) {
      throw new createHttpError.NotFound("no comments found!");
    }
    return comments;
  }
}

module.exports = new CommentServices();
