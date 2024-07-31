const express = require("express");
const router = express.Router();
const premiumclients = require("./Common/premiumclients");

//Database
const theatresignupinfo = require("../../models/theatre/signup");
const userTinfo = require("../../models/theatre/abouttheatre")



/**
 * @swagger
 * /home:
 *   post:
 *     summary: Get the theatres in the user's location
 *     tags: [USER HOME]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loc:
 *                 type: string
 *                 description: User Location
 *                 example: Vijayawada
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier of the theater
 *                   tReferenceNumber:
 *                     type: string
 *                     description: Reference number of the theater
 *                   tName:
 *                     type: string
 *                     description: Name of the theater
 *                   imgurl1:
 *                     type: string
 *                     description: URL of the first image
 *                   imgurl2:
 *                     type: string
 *                     description: URL of the second image
 *                   imgurl3:
 *                     type: string
 *                     description: URL of the third image
 *                   screentype:
 *                     type: string
 *                     description: Type of screen (e.g., 2D, 3D)
 *                   snacks:
 *                     type: string
 *                     description: Availability of snacks
 *                   Ttype:
 *                     type: string
 *                     description: Type of theater (e.g., AC, non-AC)
 *                   sound:
 *                     type: string
 *                     description: Type of sound system
 *                   about:
 *                     type: string
 *                     description: Description of the theater
 *             example: 
 *               - _id: "6448b8c279bd78711b0f69e5"
 *                 tReferenceNumber: "SAYSTheatreTIRUMALA@gmail.com"
 *                 tName: "Tirumala"
 *                 imgurl1: "https://www.boxofficepro.com/wp-content/uploads/2022/04/IMAX-with-laser-scaled.jpg"
 *                 imgurl2: "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/1/2017/12/02104957/020118_IMAXDelhi.jpg"
 *                 imgurl3: "https://www.digitaltrends.com/wp-content/uploads/2014/08/IMAX-screens-get-smaller_.jpg?fit=720%2C720&p=1"
 *                 screentype: "3D"
 *                 snacks: "Available"
 *                 Ttype: "AC"
 *                 sound: "AC"
 *                 about: "TIRUMALA is a proprietary system of high-resolution cameras, film formats, film projectors, and theaters known for having very large screens with a tall aspect ratio and steep stadium seating"
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

router.get("/", function (req, res) {

  res.json({ premiumclients: premiumclients });
});

router.post("/", async (req, res, next) => {
  // if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
  //   res.status(404).json({
  //     result: "notloggedin"
  //   });
  // }
  try {
    const loc = req.body.loc;
    // console.log(loc);
    const treffarr = [];

    const value1 = await theatresignupinfo.find({ city: loc });
    for (let i = 0; i < value1.length; i++)
      treffarr.push(value1[i].tReferenceNumber);

    const Tdetails = [];
    for (let i = 0; i < treffarr.length; i++) {
      const value = await userTinfo.findOne({ tReferenceNumber: treffarr[i] });
      Tdetails.push(value);
    }
    // console.log(Tdetails)
    res.json({ Tdetails: Tdetails });

  }
  catch (err) {
    console.log(err.status);
    next(err);
  }


})

router.get("/getsuggestion", async (req, res) => {
  let value = await theatresignupinfo.find({});
  res.json(value);
});



module.exports = router;