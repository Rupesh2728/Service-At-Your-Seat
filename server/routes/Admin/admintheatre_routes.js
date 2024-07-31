const express = require("express");
const router = express.Router();

//Database
const theatresignupinfo = require("../../models/theatre/signup");
const userTinfo = require("../../models/theatre/abouttheatre");
const theatrerentedmovieinfo = require("../../models/theatre/theatremovie");
const screeninfo = require("../../models/theatre/theatrescreen");
const movieshowinfo = require("../../models/theatre/movieshowdetails");
const snackinfo = require("../../models/theatre/snackinfo");
const showdatailsinfo = require("../../models/theatre/movieshowdetails");


/**
 * @swagger
 * /Admintheatre:
 *   get:
 *     summary: Get theatre information
 *     tags: [ADMIN THEATRE]
 *     description: |
 *       This endpoint retrieves information about all theatres registered in the system.
 *       Only admins are allowed to access this endpoint.
 *     responses:
 *       '200':
 *         description: Theatre information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 theatres:
 *                   type: array
 *                   description: Array of theatre information
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier of the theatre
 *                         example: "64398d76b61ebb7b0a62b03a"
 *                       tReferenceNumber:
 *                         type: string
 *                         description: Reference number of the theatre
 *                         example: "THEATRE123"
 *                       tName:
 *                         type: string
 *                         description: Name of the theatre
 *                         example: "Example Theatre"
 *                       temail:
 *                         type: string
 *                         description: Email address of the theatre
 *                         example: "theatre@example.com"
 *                       tNumber1:
 *                         type: number
 *                         description: Contact number 1 of the theatre
 *                         example: 1234567890
 *                       tNumber2:
 *                         type: number
 *                         description: Contact number 2 of the theatre
 *                         example: 9876543210
 *                       street:
 *                         type: string
 *                         description: Street address of the theatre
 *                         example: "123 Main Street"
 *                       city:
 *                         type: string
 *                         description: City of the theatre
 *                         example: "Example City"
 *                       state:
 *                         type: string
 *                         description: State of the theatre
 *                         example: "Example State"
 *                       pincode:
 *                         type: number
 *                         description: Pincode of the theatre
 *                         example: 123456
 *                       licensenum:
 *                         type: string
 *                         description: License number of the theatre
 *                         example: "LICENSE123"
 *                       nearbyplace1:
 *                         type: string
 *                         description: Nearby place 1 of the theatre
 *                         example: "Nearby Place 1"
 *                       nearbyplace2:
 *                         type: string
 *                         description: Nearby place 2 of the theatre
 *                         example: "Nearby Place 2"
 *                       nearbyplace3:
 *                         type: string
 *                         description: Nearby place 3 of the theatre
 *                         example: "Nearby Place 3"
 *                       nearbyplace4:
 *                         type: string
 *                         description: Nearby place 4 of the theatre
 *                         example: "Nearby Place 4"
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
 */




router.get("/", async function (req, res) {

  // if(req.cookies.islogin!="admin"){
  //   res.status(404).json({
  //     result: "Admin Should login"
  //   });
  // }
   
  let value = await theatresignupinfo.find({});
  // if (req.cookies.isUserLogin)
    res.json({theatres:value});
  // else {
  //   res.redirect("/login");
  // }
});



/**
 * @swagger
 * /Admintheatre/removetheatre:
 *   delete:
 *     summary: Remove a theatre
 *     tags: [ADMIN THEATRE]
 *     description: |
 *       This endpoint allows an admin to remove a theatre from the system.
 *       It deletes all related data associated with the theatre, including user information, rented movies, snack information, screen information, and movie show information.
 *       Only admins are allowed to access this endpoint.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tid:
 *                 type: string
 *                 description: Reference number of the theatre to be removed
 *                 example: "THEATRE123"
 *     responses:
 *       '200':
 *         description: Theatre removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 k:
 *                   type: number
 *                   description: Indicates successful removal of the theatre
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
 */



router.delete("/removetheatre", async function (req, res) {

  // if(req.cookies.islogin!="admin"){
  //   res.status(404).json({
  //     result: "Admin Should login"
  //   });
  // }

  let treffnum = req.body.tid;
  await theatresignupinfo.deleteOne({ tReferenceNumber: treffnum });
  await userTinfo.deleteOne({ tReferenceNumber: treffnum });
  await theatrerentedmovieinfo.deleteOne({ tReferenceNumber: treffnum });
  await snackinfo.deleteOne({ tReferenceNumber: treffnum });
  await screeninfo.deleteOne({ tReferenceNumber: treffnum });
  await movieshowinfo.deleteOne({ tReferenceNumber: treffnum });


  console.log("Removed the Theatre with Treffnum :"+ treffnum);

  res.json({ k: 1 });
});

  module.exports = router;