const express = require("express");
const router = express.Router();

const theatrereviewdata = require("../../models/user/theatrereview");

/**
 * @swagger
 * /tmdashboard:
 *   get:
 *     summary: Get theatre reviews
 *     tags: [THEATRE DASHBOARD REVIEW]
 *     description: |
 *       This endpoint retrieves reviews for a specific theatre based on the current theatre reference number stored in the user's cookies. 
 *       Only logged-in theatres and admins can access this endpoint.
 *     responses:
 *       '200':
 *         description: Theatre reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 treviewsarr:
 *                   type: array
 *                   description: Array containing theatre reviews
 *                   items:
 *                     type: string
 *                     example: "Great theatre, comfortable seats!"
 *                 isLogin:
 *                   type: boolean
 *                   description: Indicates whether the user is logged in
 *                   example: true
 *       '404':
 *         description: User not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message indicating user not logged in
 *                   example: "notloggedin"
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


router.get("/", async function (req, res) {


  // if(req.cookies.islogin!="theatre"&&req.cookies.islogin!="admin"){
  //   res.status(404).json({
  //     result: "notloggedin"
  //   });
  // }
 
  let treviewsarr;
  let value = await theatrereviewdata.find({
    tReferenceNumber: req.cookies.currtheatrereffnum,
  });

  if(value.length!=0)
  treviewsarr = value[0]["review"];
  else{
    treviewsarr='';
  }

    res.json({ treviewsarr: treviewsarr,isLogin:true });
});

module.exports = router;