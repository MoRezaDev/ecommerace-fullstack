const autoBind = require("auto-bind");
const productServices = require("../product/product.services");
const CommentModel = require("./comment.model");

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

  async addCommentService(userId, productId, text) {
    const product = await this.#productServices.checkExistsProduct(productId);
    const newComment = await this.#commentModel.create({
      text,
      product: productId,
      user: userId,
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
}

module.exports = new CommentServices();
