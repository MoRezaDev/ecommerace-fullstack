/**
 * @swagger
 *  tags:
 *      -   name: Product
 *          description:    all operations of Product is here
 */

/**
 * @swagger
 *  tags:
 *      -   name: Product Images
 *          description:    all operations of Product Images is here, Notice(change main and upload add images needs first product created)
 */

/**
 * @swagger
 *  /product/get-product:
 *         post:
 *              summary: get product details from id
 *              tags:
 *                  -   Product
 *              requestBody:
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                              schema:
 *                                  type: object
 *                                  properties:
 *                                      productId:
 *                                          type: string
 *              responses:
 *                  200:
 *                      description: success!
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
 *              -   Product Images
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
 *              -   Product Images
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
 *  components:
 *      schemas:
 *          addProductImages:
 *                  type: object
 *                  properties:
 *                      slug:
 *                          type: string
 *                      images:
 *                          type: array
 *                          items:
 *                              type: string
 *                              format: binary
 */

/**
 * @swagger
 *  /product/upload-images-add:
 *      post:
 *          summary: upload and add images to existing product
 *          tags:
 *              -   Product Images
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/addProductImages"
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          ChangeMainImage:
 *              type: object
 *              properties:
 *                  filename:
 *                      type: string
 *                  slug:
 *                      type: string
 */

/**
 * @swagger
 *  /product/change-main-image:
 *      post:
 *          summary: change the primary image
 *          tags:
 *              -    Product Images
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/ChangeMainImage"
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          deleteProductImages:
 *                  type: object
 *                  properties:
 *                      productId:
 *                          type: string
 *                      filenames:
 *                          type: array
 *                          items:
 *                              type: string
 *                      images_url:
 *                          type: array
 *                          items:
 *                              type: string
 *                      slug:
 *                          type: string
 */

/**
 * @swagger
 *  /product/delete-product-images:
 *      delete:
 *          summary: delete images from specific product
 *          tags:
 *              -   Product Images
 *          requestBody:
 *              content:
 *                  application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/deleteProductImages"
 *
 *          responses:
 *              200:
 *                  description: success!
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

/**
 * @swagger
 *  components:
 *      schemas:
 *          updateProduct:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  description:
 *                      type: string
 *                  categoryId:
 *                      type: string
 *                  specification:
 *                      type: object
 */

/**
 * @swagger
 *  /product/update-product:
 *      put:
 *          summary: Update product details except images
 *          tags:
 *              -   Product
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/updateProduct"
 *                  application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/updateProduct"
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 *  /product/clear:
 *      delete:
 *          summary: delete all Product Model Data
 *          tags:
 *              -   Product
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 *  /product/delete-products:
 *      delete:
 *          summary: Delete multiple products
 *          tags:
 *              -   Product
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  productsId:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 *  /product/delete-product:
 *      delete:
 *          summary: Delete specific product from productId
 *          tags:
 *              -   Product
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  productsId:
 *                                      type: string
 *
 *          responses:
 *              200:
 *                  description: success!
 */
