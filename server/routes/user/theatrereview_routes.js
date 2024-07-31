const express = require("express");
const router = express.Router();


//Database
const theatresignupinfo = require("../../models/theatre/signup");
const theatrereviewdata = require("../../models/user/theatrereview");
const userinfo = require("../../models/user/signup");

/**
 * @swagger
 * /treviews:
 *   get:
 *     summary: Get theatre details and reviews
 *     tags: [USER THEATRE REVIEW]
 *     parameters:
 *       - in: query
 *         name: tref
 *         required: true
 *         description: Reference number of the theatre
 *         schema:
 *           type: string
 *           example: "SAYSTheatreTIRUMALA@gmail.com"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tname:
 *                   type: string
 *                   description: Name of the theatre
 *                 reviewdata:
 *                   type: array
 *                   description: Reviews of the theatre
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier of the review
 *                       theatre:
 *                         type: string
 *                         description: Name of the theatre
 *                       rating:
 *                         type: number
 *                         description: Rating of the theatre
 *                         example: 4.5
 *                       comment:
 *                         type: string
 *                         description: Comment about the theatre
 *                         example: "Great theatre, comfortable seats!"
 *       '404':
 *         description: User is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Indicates that the user is not logged in
 *                   example: notloggedin
 *       '500':
 *         description: Some error happened
 */




router.get("/", async (req, res) => {
    
  if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
    res.status(404).json({
      result: "notloggedin"
    });
  }


    const tno = req.query.treff;
    let value = await theatresignupinfo.findOne({ tReferenceNumber: tno });
    let tname = value.tName;
    let review2 = await theatrereviewdata.find({ tReferenceNumber: tno });
    res.json({ tname: tname, reviewdata: review2});

});

/**
 * @swagger
 * /treviews:
 *   post:
 *     summary: Add a review for a theatre
 *     tags: [USER THEATRE REVIEW]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               treff:
 *                 type: string
 *                 description: Reference number of the theatre
 *                 example: "SAYSTheatreTIRUMALA@gmail.com"
 *               review:
 *                 type: string
 *                 description: Review of the theatre
 *               rating:
 *                 type: number
 *                 description: Rating of the theatre
 *                 example: 4.5
 *     responses:
 *       '200':
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 k:
 *                   type: number
 *                   description: Indicates success (1)
 *                   example: 1
 *       '404':
 *         description: User is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Indicates that the user is not logged in
 *                   example: notloggedin
 *       '500':
 *         description: Some error happened
 */


  router.post("/", async (req, res) => {

    if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
      res.status(404).json({
        result: "notloggedin"
      });
    }
  

    const tno = req.query.treff;
    const review1 = req.body.review;
    const rating1 = req.body.rating;
  
    let userdetails = await userinfo.findOne({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
  
    let myobj2 = {
      tReferenceNumber: tno,
      review: {
        username: userdetails.firstName,
        usermailid: userdetails.email,
        rating: rating1,
        reviewdesc: review1,
      },
    };
    let theatrereviewmodel = new theatrereviewdata(myobj2);
    await theatrereviewmodel.save();
  
    res.json({k:1});
  });

  module.exports = router;