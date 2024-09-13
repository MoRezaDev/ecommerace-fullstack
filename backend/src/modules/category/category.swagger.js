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

/**
 * @swagger
 *  /category/update:
 *      put:
 *          summary: update Category name
 *          tags:
 *              -   Category
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  categoryId:
 *                                      type: string
 *                                  name:
 *                                      type: string
 *                              required:
 *                                  -   categoryId
 *                                  -   name
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /category/{slug}/{rest}:
 *      get:
 *          summary: get products by category slug(Swagger has bug for dynamic params in /,this feature not working in swagger but it working correctly)
 *          tags:
 *              -   Category
 *          parameters:
 *              - in: path
 *                name: slug
 *                required: true
 *                schema:
 *                  type: string
 *              - in: path
 *                name: rest
 *                required: false
 *                schema:
 *                  type: string
 *
 *
 *
 *          responses:
 *              200:
 *                  description: success
 */
