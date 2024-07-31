const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const userinfo=require("../../models/user/signup");
const theatresignupinfo = require("../../models/theatre/signup");




/**
 * @swagger
 * /adminmassmail:
 *   post:
 *     summary: Send email
 *     tags: [ADMIN MASS MAIL]
 *     description: |
 *       This endpoint allows an admin to send emails to users or theatres based on different criteria.
 *       Only admins are allowed to access this endpoint.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *                 description: Subject of the email
 *                 example: "Important Announcement"
 *               message:
 *                 type: string
 *                 description: Body of the email
 *                 example: "Hello, This is an important announcement regarding the upcoming event."
 *               toaddress:
 *                 type: string
 *                 description: Recipient type (None, Both, All Users, All Theatres)
 *                 enum: [None, Both, All Users, All Theatres]
 *               tomail:
 *                 type: string
 *                 description: Email address of the specific recipient (optional)
 *                 example: "example@example.com"
 *     responses:
 *       '200':
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 k:
 *                   type: integer
 *                   description: Indicates the success of the operation
 *                   example: 1
 *       '404':
 *         description: Admin authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message indicating admin authentication failure
 *                   example: "Admin Should login"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       '422':
 *         description: Unprocessable Entity - Missing or invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating missing or invalid request body
 */



router.post("/", async function (req, res) {

  // if(req.cookies.islogin!="admin"){
  //   res.status(404).json({
  //     result: "Admin Should login"
  //   });
  // }

  let subject = req.body.subject;
  let message = req.body.message;
  let toaddress2 = req.body.tomail;
  let toaddress = req.body.toaddress;
  // let fromaddress = req.body.fromaddress;
  let emailarr = [];
  if (toaddress == "None" && toaddress2 != "") {
    emailarr.push(toaddress2);
  } else if (toaddress == "Both") {
    let value = await theatresignupinfo.find({});
    let value2 = await userinfo.find({});
    for (let i = 0; i < value.length; i++) {
      emailarr.push(value[i]["temail"]);
    }

    for (let i = 0; i < value2.length; i++) {
      emailarr.push(value2[i]["email"]);
    }
  } else if (toaddress == "All Users") {
    let value2 = await userinfo.find({});
    for (let i = 0; i < value2.length; i++) {
      emailarr.push(value2[i]["email"]);
    }
  } else if (toaddress == "All Theatres") {
    let value = await theatresignupinfo.find({});
    for (let i = 0; i < value.length; i++) {
      emailarr.push(value[i]["temail"]);
    }
  }

  let mailtransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "contactsays123@gmail.com",
      pass: "hhbemttmmjnxzfri",
    },
  });

  let details = {
    from: "contactsays123@gmail.com",
    to: emailarr,
    subject: subject,
    text: message,
  };
  mailtransporter.sendMail(details, (err) => {
    if (err) console.log(err);
    else {
      sentdata = "Email has been sent successfully";
      console.log("Email has sent!!!");
    }
  });

  res.json({k:1});
});

  module.exports = router;