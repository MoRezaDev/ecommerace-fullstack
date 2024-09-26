const {
  addCommentController,
  editStatusCommentController,
  removeCommentController,
  removeDeniedCommentsController,
  getDeniedCommentsController,
  getPendingCommentsController,
} = require("./comment.controller");

const router = require("express").Router();

router.post("/add", addCommentController);
router.put("/edit-status", editStatusCommentController);
router.delete("/remove", removeCommentController);
router.delete("/remove-denied", removeDeniedCommentsController);
router.get("/get-denied-comments", getDeniedCommentsController);
router.get("/get-pending-comments", getPendingCommentsController);

module.exports = {
  CommentRoutes: router,
};
