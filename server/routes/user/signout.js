const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /signout:
 *   get:
 *     summary: Sign out the user
 *     tags: [USER SIGNOUT]
 *     responses:
 *       '200':
 *         description: User successfully signed out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Indicates the result of the sign out attempt
 *                   example: signed out
 *       '500':
 *         description: Some error happened
 */


router.get("/", function (req, res) {
    console.log("signout user");
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.clearCookie("islogin");
    res.json({result:"signed out"});
  });

module.exports = router;