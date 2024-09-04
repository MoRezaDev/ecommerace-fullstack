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
 *                          primaryImage:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  format: binary
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
