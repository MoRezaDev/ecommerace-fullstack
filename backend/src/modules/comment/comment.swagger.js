/**
 * @swagger
 *  tags:
 *      -   name: Comment
 *          description: All user and Admin Routes about Comment
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          addComment:
 *              type: object
 *              properties:
 *                  productId:
 *                      type: string
 *                  text:
 *                      type: string
 */

/**
 * @swagger
 *  /comment/add:
 *      post:
 *          summary: Add comment to product
 *          tags:
 *              -   Comment
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/addComment"
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          editStatusComment:
 *              type: object
 *              properties:
 *                  productId:
 *                      type: string
 *                  status:
 *                      type: string
 */

/**
 * @swagger
 *  /comment/edit-status:
 *      put:
 *          summary: Edit status Comment
 *          tags:
 *              -   Comment
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/editStatusComment"
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 *  /comment/remove:
 *      delete:
 *          summary: Removes the specific comment
 *          tags:
 *              -   Comment
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              commentId:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 *  /comment/remove-denied:
 *      delete:
 *          summary: Removes all denied Comments from admins
 *          tags:
 *              -   Comment
 *
 *          responses:
 *              200:
 *                  description: success!
 */



/**
 * @swagger
 *  /comment/get-denied-comments:
 *      get:
 *          summary: get all denied Comments
 *          tags:
 *              -   Comment
 *
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 *  /comment/get-pending-comments:
 *      get:
 *          summary: get all pending Comments
 *          tags:
 *              -   Comment
 *
 *          responses:
 *              200:
 *                  description: success!
 */