
const express = require("express");
const router = express.Router();

//Database
const userTinfo = require("../../models/theatre/abouttheatre");
const theatresignupinfo = require("../../models/theatre/signup");
/**
 * @swagger
 * /usertheatreprofile:
 *   get:
 *     summary: Get information about a theatre
 *     tags: [Theatre Information]
 *     parameters:
 *       - in: query
 *         name: treff
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
 *                 Tdetails:
 *                   type: object
 *                   description: Details of the requested theatre
 *                 nearbyplaces:
 *                   type: object
 *                   description: Nearby places related to the theatre
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


router.get("/", async function (req, res) {
    let obj1 = {};
    let obj2 = {};
     
    if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
      res.status(404).json({
        result: "notloggedin"
      });
    }

      let treff = req.query.treff;
      let value = await userTinfo.findOne({ tReferenceNumber: treff });
      let value2 = await theatresignupinfo.findOne({ tReferenceNumber: treff });
      res.json({ Tdetails: value, nearbyplaces: value2 });
  });

  module.exports = router;