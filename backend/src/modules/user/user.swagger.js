/**
 * @swagger
 *  tags:
 *      -   name: User
 *          description:    Get user info
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          getUserSession:
 *              type: object
 *              properties:
 *                  userId:
 *                      type: string
 *              required:
 *                  -   userId
 */

/**
 * @swagger
 *  /user/session:
 *   get:
 *      summary:    getting all user info
 *      tags:
 *          -   User

 *      responses:
 *          200:
 *              description: success!
 */

/**
 * @swagger
 *  /user/upload-profile-pic:
 *      post:
 *          summary: uploads photo
 *          tags:
 *              -   User
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              profile-pic:
 *                                  type: string
 *                                  format: binary
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /user/delete-profile-pic:
 *      delete:
 *          summary: delete users profile picture
 *          tags:
 *              -   User
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 *  /user/delete:
 *      delete:
 *          summary: delete user from Admin Access
 *          tags:
 *              -   User
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                          schema:
 *                              type:   object
 *                              properties:
 *                                  userId:
 *                                      type: string
 *                              required:
 *                                  -   userId
 *          responses:
 *              200:
 *                  description: success!
 */


