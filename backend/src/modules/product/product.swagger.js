/**
 * @swagger
 *  tags:
 *      -   name: Product
 *          description:    all operations of Product is here
 */

/**
 * @swagger
 *  components:
 *          schemas:
 *              updateProductImages:
 *                      type: object
 *                      properties:
 *                          images:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  format: binary
 */

/**
 * @swagger
 *  /product/upload-images:
 *      post:
 *          summary: Uploads product iamges to temporary folder
 *          tags:
 *              -   Product
 *          requestBody:
 *                  content:
 *                      multipart/form-data:
 *                          schema:
 *                              $ref: "#/components/schemas/updateProductImages"
 *
 *          responses:
 *                  200:
 *                      description: success!
 */

/**
 * @swagger
 *  /product/upload-image-main:
 *      post:
 *          summary: Uploads product iamge main to temporary folder
 *          tags:
 *              -   Product
 *          requestBody:
 *                  content:
 *                      multipart/form-data:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  main_image:
 *                                      type: string
 *                                      format: binary
 *
 *          responses:
 *                  200:
 *                      description: success!
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         categoryId:
 *           type: string
 *         specification:
 *           type: object
 *         images:
 *           type: object
 *           properties:
 *             images_url:
 *               type: array
 *               items:
 *                  type: string
 *             image_main_url:
 *               type: string
 *
 */

/**
 * @swagger
 *  /product/create:
 *      post:
 *          summary: create product
 *          tags:
 *              -   Product
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                            schema:
 *                              $ref: "#/components/schemas/CreateProduct"
 *          responses:
 *              200:
 *                  description: success!
 *
 */
