/**
 * @swagger
 *  tags:
 *     - name: Auth
 *       description: API for managing users
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          sendOTP:
 *              type:   object
 *              required:
 *                  - mobile
 *              properties:
 *                  mobile:
 *                      type: number
 *
 *          checkOTP:
 *              type:   object
 *              required:
 *                  - code
 *                  - mobile
 *              properties:
 *                  code:
 *                      type: number
 *                  mobile:
 *                      type: number
 */

/**
 * @swagger
 *  /auth/send-otp:
 *      post:
 *          summary:    send mobile to get the otp code
 *
 *          tags:
 *              -   Auth
 *          description: Returns the code otp from backend
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/sendOTP'
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/sendOTP'
 *          responses:
 *              200:
 *                  description : success
 */

/**
 * @swagger
 *  /auth/check-otp:
 *  post:
 *      summary: check otp and sending accessToken
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/checkOTP"
 *              application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/checkOTP"
 *
 *      responses:
 *          200:
 *              description: success!
 */

/**
 * @swagger
 *  /auth/logout:
 *      get:
 *          summary: Logout and clear token
 *          tags:
 *              -   Auth
 *          responses:
 *              200:
 *                  description: success!
 */
