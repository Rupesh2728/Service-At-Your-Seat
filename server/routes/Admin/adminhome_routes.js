const express = require("express");
const router = express.Router();
const nodemailer= require("nodemailer");
//Database
const contactusqueries = require("../../models/Admin/contactusqueries");
const theatreverification = require("../../models/Admin/theatreverification");
const theatresignupinfo = require("../../models/theatre/signup");
const userinfo = require("../../models/user/signup");





/**
 * @swagger
 * /adminhome:
 *   get:
 *     summary: Get dashboard data for admin
 *     tags: [ADMIN HOME]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msgobjarr:
 *                   type: array
 *                   description: Array of message objects
 *                   items:
 *                     type: object
 *                     properties:
 *                       sender:
 *                         type: string
 *                         description: Sender of the message
 *                       message:
 *                         type: string
 *                         description: Content of the message
 *                       date:
 *                         type: string
 *                         description: Date of the message
 *                 tnum:
 *                   type: integer
 *                   description: Number of theatres signed up
 *                   example: 10
 *                 unum:
 *                   type: integer
 *                   description: Number of users signed up
 *                   example: 100
 *                 theatreverificationarr:
 *                   type: array
 *                   description: Array of theatre verification objects
 *                   items:
 *                     type: object
 *                     properties:
 *                       theatreName:
 *                         type: string
 *                         description: Name of the theatre
 *                       verificationStatus:
 *                         type: string
 *                         description: Verification status of the theatre
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

  let msgobjarr = [];
  let theatreverificationarr = [];
  let value3 = await theatreverification.find({});
  for (let i = 0; i < value3.length; i++) {
    theatreverificationarr.push(value3[i]);
  }

  let value = await contactusqueries.find({});
  for (let i = 0; i < value.length; i++) {
    for (let j = 0; j < value[i]["msginfo"].length; j++) {
      msgobjarr.push(value[i]["msginfo"][j]);
    }
  }
  if (msgobjarr.length != 0) msgobjarr.sort((a, b) => new Date(b.date) - new Date(a.date));

  const value1 = await theatresignupinfo.find({});
  const tnum = value1.length;
  const value2 = await userinfo.find({});
  const unum = value2.length;
 
  const obj={
        msgobjarr: msgobjarr,
        tnum: tnum,
        unum: unum,
        theatreverificationarr: theatreverificationarr,
      }

  res.json(obj);

  // if (req.cookies.isUserLogin)
  //   res.render("adminhomepage", {
  //     msgobjarr: msgobjarr,
  //     tnum: tnum,
  //     unum: unum,
  //     theatreverificationarr: theatreverificationarr,
  //   });
  // else {
  //   res.redirect("/login");
  // }
});


/**
 * @swagger
 * /adminhome/accepttheatre:
 *   post:
 *     summary: Accept theatre registration
 *     tags: [ADMIN HOME]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temail:
 *                 type: string
 *                 description: Email of the theatre to accept
 *                 example: theatre@example.com
 *     responses:
 *       '200':
 *         description: Theatre registration accepted successfully
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


router.post("/accepttheatre", async function (req, res) {

  // if(req.cookies.islogin!="admin"){
  //   res.status(404).json({
  //     result: "Admin Should login"
  //   });
  // }


  let temail = req.body.temail;
  let value4 = await theatreverification.find({ temail: temail });
  let subject = "Successful Theatre Registration in SAYS";
  let message =
    "Hello, Your Theatre Registered With MailId " +
    temail +
    " has been Verified and Accepted your Registration.Please Login and Complete the Remaining Procedures.Thank You";
  let newtheatre = new theatresignupinfo();
  newtheatre.tReferenceNumber = value4[0].tReferenceNumber;
  newtheatre.tName = value4[0].tName;
  newtheatre.temail = value4[0].temail;
  newtheatre.tNumber1 = value4[0].tNumber1;
  newtheatre.tNumber2 = value4[0].tNumber2;
  newtheatre.street = value4[0].street;
  newtheatre.city = value4[0].city;
  newtheatre.state = value4[0].state;
  newtheatre.pincode = value4[0].pincode;
  newtheatre.licensenum = value4[0].licensenum;
  newtheatre.LoginPassword = value4[0].LoginPassword;
  newtheatre.nearbyplace1 = value4[0].nearbyplace1;
  newtheatre.nearbyplace2 = value4[0].nearbyplace2;
  newtheatre.nearbyplace3 = value4[0].nearbyplace3;
  newtheatre.nearbyplace4 = value4[0].nearbyplace4;
  let k = await newtheatre.save();
  if (k) {
    console.log("Theatre Succesfully Accepted by Admin");
  }

  let l = await theatreverification.deleteOne({ temail: temail });
  if (l) {
    console.log("Theatre Succesfully Deleted from Verification DB");
  }

  if (k && l) {
    let mailtransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "contactsays123@gmail.com",
        pass: "hhbemttmmjnxzfri",
      },
    });

    let details = {
      from: "contactsays123@gmail.com",
      to: temail,
      subject: subject,
      text: message,
    };
    mailtransporter.sendMail(details, (err) => {
      if (err) console.log(err);
      else {
        console.log("Theatre Acceptance Email has been sent successfully!!!");
      }
    });
    res.json({ k: 1 });
  }
});



/**
 * @swagger
 * /admin/rejecttheatre:
 *   post:
 *     summary: Reject theatre registration
 *     tags: [ADMIN HOME]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temail:
 *                 type: string
 *                 description: Email of the theatre to reject
 *                 example: theatre@example.com
 *     responses:
 *       '200':
 *         description: Theatre registration rejected successfully
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


router.post("/rejecttheatre", async function (req, res) {

   
  // if(req.cookies.islogin!="admin"){
  //   res.status(404).json({
  //     result: "Admin Should login"
  //   });
  // }

  let temail = req.body.temail;
  let subject = "Theatre Registration Declined By SAYS";
  let message =
    "Hello, Your Theatre Registered With MailId " +
    temail +
    " has been Rejected for some Reasons.For Further Enquiries,Please contact contactsays123@gmail.com.";
  let l = await theatreverification.deleteOne({ temail: temail });
  if (l) {
    console.log("Theatre Rejected by Admin!!!");
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
    to: temail,
    subject: subject,
    text: message,
  };
  mailtransporter.sendMail(details, (err) => {
    if (err) console.log(err);
    else {
      console.log("Theatre Rejection Email has been sent successfully");
    }
  });
  res.json({ k: 1 });
});

  module.exports = router;