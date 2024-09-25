/**
 * @swagger
 *  tags:
 *      -   name: Cart
 *          description: handles Add or Remove items in the cart
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          addCartItem:
 *              type: object
 *              properties:
 *                  cartId:
 *                      type: string
 *                  productId:
 *                      type: string
 *
 */

/**
 * @swagger
 *  /cart/add:
 *  post:
 *      summary: Handles if the item is not added to cart
 *      tags:
 *          -   Cart
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/addCartItem"
 *      responses:
 *          200:
 *              description:    success!
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          updateCartQuantity:
 *                  type: object
 *                  properties:
 *                      cartId:
 *                          type: string
 *                      cartItemId:
 *                          type: string
 *                      quantity:
 *                          type: number
 */

/**
 * @swagger
 *  /cart/update:
 *      put:
 *          summary: update the quantity of cart
 *          tags:
 *              -   Cart
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/updateCartQuantity"
 *          responses:
 *              200:
 *                  description:    success!
 *
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          removeCartItem:
 *                  type: object
 *                  properties:
 *                      cartId:
 *                          type: string
 *                      cartItemId:
 *                          type: string
 *
 */

/**
 * @swagger
 *  /cart/remove:
 *      delete:
 *          summary: removes the specific item from cart_items
 *          tags:
 *              -   Cart
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref:  "#/components/schemas/removeCartItem"
 *          responses:
 *              200:
 *                  description:    success!
 *
 */

/**
 * @swagger
 *  /cart/remove-all:
 *      delete:
 *          summary: removes all items from cart_items
 *          tags:
 *              -   Cart
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  cartId:
 *                                      type: string
 *          responses:
 *              200:
 *                  description:    success!
 *
 */
