const express = require("express");
const router = express.Router();


//Database 
const ticketinfo = require("../../models/user/ticketsinfo");


/**
 * @swagger
 * /recentbooking:
 *   get:
 *     summary: Get user's ticket information
 *     tags: [USER TICKETS]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticketarr:
 *                   type: array
 *                   description: Array of user's ticket information
 *                   items:
 *                     type: object
 *                     properties:
 *                       TicketId:
 *                         type: string
 *                         description: Unique identifier of the ticket
 *                       MovieName:
 *                         type: string
 *                         description: Name of the movie
 *                       Movieimgurl:
 *                         type: string
 *                         description: URL of the movie's image
 *                       theatrename:
 *                         type: string
 *                         description: Name of the theater
 *                       location:
 *                         type: string
 *                         description: Location of the theater
 *                       time:
 *                         type: string
 *                         description: Show time of the ticket
 *                       seats:
 *                         type: array
 *                         description: Array of seat numbers booked for the ticket
 *                         items:
 *                           type: string
 *                           example: A1
 *                       screenname:
 *                         type: string
 *                         description: Name of the screen
 *                 k:
 *                   type: number
 *                   description: Indicates if tickets are found (1) or not (0)
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
 *         description: Internal server error
 */


router.get("/", async function (req, res) {
   
  if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
    res.status(404).json({
      result: "notloggedin"
    });
  }

    let ticketarr;
    let k;
    let value1 = await ticketinfo.find({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
    if (value1.length == 0) {
      k = 0;
      ticketarr = [];
    } else {
      ticketarr = value1[0]["Ticketinfo"];
      k = 1;
    }

      res.json({ ticketarr: ticketarr, k: k });
  });
  

/**
 * @swagger
 * /recentbooking/getticketinfo:
 *   post:
 *     summary: Get ticket information by TicketId
 *     tags: [USER TICKETS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TicketId:
 *                 type: string
 *                 description: Unique identifier of the ticket
 *                 example: "SAYS1001"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 TicketId:
 *                   type: string
 *                   description: Unique identifier of the ticket
 *                 MovieName:
 *                   type: string
 *                   description: Name of the movie
 *                 Movieimgurl:
 *                   type: string
 *                   description: URL of the movie's image
 *                 theatrename:
 *                   type: string
 *                   description: Name of the theater
 *                 location:
 *                   type: string
 *                   description: Location of the theater
 *                 time:
 *                   type: string
 *                   description: Show time of the ticket
 *                 seats:
 *                   type: array
 *                   description: Array of seat numbers booked for the ticket
 *                   items:
 *                     type: string
 *                     example: A1
 *                 screenname:
 *                   type: string
 *                   description: Name of the screen
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
 *         description: Internal server error
 */




  router.post("/getticketinfo", async function (req, res) {
    
    if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
      res.status(404).json({
        result: "notloggedin"
      });
    }

    let tid = req.body.TicketId;
    let value1 = await ticketinfo.find({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
    let ticketarr = value1[0]["Ticketinfo"];
    let tobj;
    for (let i = 0; i < ticketarr.length; i++) {
      if (tid == ticketarr[i]["TicketId"]) {
        tobj = ticketarr[i];
        break;
      }
    }
    res.json(tobj);
  });

  module.exports = router;