/**
 * @swagger
 *  tags:
 *      -   name: Category
 *          description: This route is About Categories Crud opperations
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          createCategory:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  parent:
 *                      type: string
 *              required:
 *                  -   name
 *                  -   slug
 */

/**
 * @swagger
 *  /category/create:
 *      post:
 *          summary: Create Category
 *          tags:
 *              -   Category
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/createCategory"
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 *  /category/get-all-categories:
 *      get:
 *          summary: get all categories from db
 *          tags:
 *              -   Category
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 *  /category/get-category-by-id:
 *      post:
 *          summary: get the category detail by cateogryId
 *          tags:
 *              -   Category
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              categoryId:
 *                                  type: string
 *                          required:
 *                              -   categoryId
 *          responses:
 *               200:
 *                 description: success!
 */

/**
 * @swagger
 *  /category/get-category-by-slug:
 *      post:
 *          summary: get the category detail by slug
 *          tags:
 *              -   Category
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              slug:
 *                                  type: string
 *                          required:
 *                              -   slug
 *          responses:
 *               200:
 *                  description: success!
 */

/**
 * @swagger
 *  /category/delete-all:
 *      delete:
 *          summary: delete all categories
 *          tags:
 *              -   Category
 *          responses:
 *                  200:
 *                      description: success
 */

/**
 * @swagger
 *  /category/delete-by-id:
 *      delete:
 *          summary: delete category by id
 *          tags:
 *              -   Category
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              categoryId:
 *                                  type: string
 *                          required:
 *                              -   categoryId
 *          responses:
 *                  200:
 *                      description: success
 */
