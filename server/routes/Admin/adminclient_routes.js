const express = require("express");
const router = express.Router();


//Database
const userinfo = require("../../models/user/signup");
const mgamestatus = require("../../models/user/moviegamestatus");
const quizleaderboard = require("../../models/user/quizleaderboard");
const ticketinfo = require("../../models/user/ticketsinfo");



/**
 * @swagger
 * /Adminclient:
 *   get:
 *     summary: Get information about all users
 *     tags: [ADMIN CLIENT]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   description: Array containing information about all users
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier of the user
 *                       UserReferenceNumber:
 *                         type: string
 *                         description: Reference number of the user
 *                       firstName:
 *                         type: string
 *                         description: First name of the user
 *                       lastName:
 *                         type: string
 *                         description: Last name of the user
 *                       DOB:
 *                         type: string
 *                         description: Date of birth of the user
 *                       email:
 *                         type: string
 *                         description: Email address of the user
 *                       MobileNumber:
 *                         type: integer
 *                         description: Mobile number of the user
 *                       Gender:
 *                         type: string
 *                         description: Gender of the user
 *                       LoginPassword:
 *                         type: string
 *                         description: Encrypted login password of the user
 *                       profilePassword:
 *                         type: string
 *                         description: Encrypted profile password of the user
 *                       cardName:
 *                         type: string
 *                         description: Name on the card associated with the user
 *                       cardNumber:
 *                         type: integer
 *                         description: Card number associated with the user
 *                       CVV:
 *                         type: string
 *                         description: Encrypted CVV of the card associated with the user
 *                       expiry:
 *                         type: string
 *                         description: Encrypted expiry date of the card associated with the user
 *       '404':
 *         description: Admin is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Indicates that the admin is not logged in
 *                   example: Admin Should login
 *       '500':
 *         description: Some error happened
 */



router.get("/", async function (req, res) {
   
  // if(req.cookies.islogin!="admin"){
  //   res.status(404).json({
  //     result: "Admin Should login"
  //   });
  // }

  let value = await userinfo.find({});
  res.json({users:value});
});

/**
 * @swagger
 * /Adminclient/removeuser:
 *   delete:
 *     summary: Remove a user and associated data
 *     tags: [ADMIN CLIENT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 description: User reference number (User ID)
 *     responses:
 *       '200':
 *         description: User removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 k:
 *                   type: integer
 *                   description: Indicates successful removal (1 for success)
 *                   example: 1
 *       '404':
 *         description: Admin is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Indicates that the admin is not logged in
 *                   example: Admin Should login
 *       '500':
 *         description: Some error happened
 */



router.delete("/removeuser", async function (req, res) {

  // if(req.cookies.islogin!="admin"){
  //   res.status(404).json({
  //     result: "Admin Should login"
  //   });
  // }

  let ureffnum = req.body.uid;

  await userinfo.deleteOne({ UserReferenceNumber: ureffnum });
  await ticketinfo.deleteOne({ UserReferenceNumber: ureffnum });
  await mgamestatus.deleteOne({ UserReferenceNumber: ureffnum });
  await quizleaderboard.deleteOne({ UserReferenceNumber: ureffnum });


  console.log("Removed the user with Reff number : " + ureffnum)

  res.json({ k: 1 });
});

  module.exports = router;