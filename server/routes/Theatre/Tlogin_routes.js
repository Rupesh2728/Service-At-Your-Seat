const express = require("express");
const router = express.Router();
const md5 = require("md5");

//Database
const theatresignupinfo = require("../../models/theatre/signup");

/**
 * @swagger
 * /Tlogin:
 *   post:
 *     summary: Theatre login
 *     tags: [THEATRE LOGIN]
 *     description: |
 *       This endpoint allows theatres to log in using their email, license number, and password.
 *       Upon successful login, the theatre's reference number and city are stored in cookies for further operations.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Theatre's email address
 *               License:
 *                 type: string
 *                 description: Theatre's license number
 *               password:
 *                 type: string
 *                 description: Theatre's password
 *             example:
 *               email: "theatre@example.com"
 *               License: "12345"
 *               password: "password123"
 *     responses:
 *       '200':
 *         description: Theatre logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Success message
 *                   example: "theatre"
 *                 currtheatrereffnum:
 *                   type: string
 *                   description: Current theatre's reference number
 *                   example: "SAYS123"
 *                 currtheatrecity:
 *                   type: string
 *                   description: Current theatre's city
 *                   example: "New York"
 *       '404':
 *         description: Login failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message indicating login failure
 *                   example: "error"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating an internal server error
 */


router.post("/", async function (req, res) {
  let email = req.body.email;
  let License_Number = req.body.License;
  let password = md5(req.body.password);



  let value = await theatresignupinfo
    .find({
      temail: email,
      licensenum: License_Number,
      LoginPassword: password,
    })

  if (value.length == 0) {
    res.status(400).json({
      result: "error",
    });
  }
  else {
    console.log("TLogin success");
    res.cookie("currtheatrereffnum", value[0].tReferenceNumber);
    let k =
      value[0].city.charAt(0).toUpperCase() +
      value[0].city.slice(1).toLowerCase();
   res.cookie("currtheatrecity", k);
   res.cookie("islogin","theatre");
    res.status(200).json({
      result: "theatre",
      currtheatrereffnum: value[0].tReferenceNumber,
      currtheatrecity: k
    });
  }

});


router.post("/checktheatre", function (req, res) {
  let k = 0;
  let { email } = req.body;
  theatresignupinfo.find({ temail: email }).then((value) => {
    if (value.length != 0) {
      k = 1;
    }

    res.json({ k: k });
  })
});





module.exports = router;