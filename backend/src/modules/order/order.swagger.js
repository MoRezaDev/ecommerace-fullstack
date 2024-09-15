/**
 * @swagger
 *  tags:
 *      -   name: Order
 *          description: All About Order Operations here
 *      -   name: Admin Order
 *          description: Admin features for controll Orders
 */

/**
 * @swagger
 *  /order/get-user-orders:
 *      get:
 *          summary: Get user orders from user credentials
 *          tags:
 *              -   Order
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 * /order/get-user-orders-by-status:
 *  get:
 *      summart: Get user Orders by status
 *      tags:
 *          -   Order
 *      parameters:
 *          -   in: query
 *              name: status
 *              schema:
 *                  type: string
 *              description: Status is String format must valid, this checks in backend enum db
 *      responses:
 *          200:
 *              description: success!
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          createOrder:
 *              type: object
 *              properties:
 *                  products:
 *                      type: array
 *                      items:
 *                          type: string
 *                  address:
 *                      type: string
 *                  location:
 *                      type: object
 *                      properties:
 *                          latitude:
 *                              type: string
 *                          longitude:
 *                              type: string
 *                  deliver_date:
 *                      type: string
 *              required:
 *                  -   products
 */

/**
 * @swagger
 *  /order/create-order:
 *      post:
 *          summary: Create Order
 *          tags:
 *              -    Order
 *          requestBody:
 *              content:
 *                  application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/createOrder"
 *                  application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/createOrder"
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          updateOrder:
 *                  type: object
 *                  properties:
 *                      orderId:
 *                          type: string
 *                      address:
 *                          type: string
 *                      location:
 *                          type: object
 *                          properties:
 *                              latitude:
 *                                  type: string
 *                              longitude:
 *                                  type: string
 *                      deliver_date:
 *                          type: string
 *                  required:
 *                      -   orderId
 */

/**
 * @swagger
 *  /order/update-order:
 *  put:
 *      summary: Update order By User
 *      tags:
 *          -   Order
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/updateOrder"
 *      responses:
 *          200:
 *              description:  success!
 *
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          createTransaction:
 *              type: object
 *              properties:
 *                  orderId:
 *                      type: string
 *                  status:
 *                      type: string
 *                  tracking_number:
 *                      type: number
 *
 */

/**
 * @swagger
 *  /order/create-transaction:
 *      post:
 *          summary: Create transaction payment
 *          tags:
 *              -   Order
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/createTransaction"
 *          responses:
 *              200:
 *                  description: success
 *
 */

//Admin Swagger routes

/**
 * @swagger
 *  /order/get-user-orders-by-id:
 *      post:
 *          summary: Get user orders by Id
 *          tags:
 *              -   Admin Order
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              userId:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /order/update-order-status:
 *      put:
 *          summary: Update Order status
 *          tags:
 *              -   Admin Order
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  orderId:
 *                                      type: string
 *                                  status:
 *                                      type: string
 *          responses:
 *              200:
 *                  description: success!
 *
 */

/**
 * @swagger
 *  /order/get-all-process-orders:
 *      get:
 *          summart: Get all proccessing Orders
 *          tags:
 *              -   Admin Order
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 *  /order/get-order:
 *      post:
 *          summary: Get order from Admin
 *          tags:
 *              -   Admin Order
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  orderNumber:
 *                                      type: string
 *          responses:
 *              200:
 *                  description: success!
 */

/**
 * @swagger
 *  /order/delete-order:
 *      delete:
 *          summary: Delete order from Admin
 *          tags:
 *              -   Admin Order
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              orderId:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: success!
 */
