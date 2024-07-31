const express = require("express");
const router = express.Router();

// Database
const ticketinfo = require("../../models/user/ticketsinfo");
const theatresignupinfo = require("../../models/theatre/signup");
const snackinfo = require("../../models/theatre/snackinfo");

/**
 * @swagger
 * /snacks:
 *   get:
 *     summary: Get available snacks for a ticket
 *     tags: [USER SNACKS]
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
 *                   description: Identifier of the ticket
 *                 fooditem:
 *                   type: array
 *                   description: Available snacks for the ticket
 *                   items:
 *                     type: string
 *                 ticketarr:
 *                   type: array
 *                   description: Array of tickets associated with the user
 *                   items:
 *                     type: object
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

  let ticketarr = [];
  console.log(req.cookies.UserReferenceNumber);
  let value1 = await ticketinfo.find({
    UserReferenceNumber: req.cookies.UserReferenceNumber,
  });
  // console.log(value1);
  if (value1.length!=0){
    ticketarr = value1[0]["Ticketinfo"];
  let n = ticketarr.length;

    let ticketid;
    let theatrename;
    let location;

    if (req.cookies.TicketIdForSnacks) {
      ticketid = req.cookies.TicketIdForSnacks;
    } else {
      ticketid = ticketarr[n - 1]["TicketId"];
    }

    let value11 = await ticketinfo.findOne({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });

    value11 = value11.Ticketinfo;

    for (let i = 0; value1.length; i++) {
      if (ticketid == value11[i]["TicketId"]) {
        theatrename = value11[i]["theatrename"];
        location = value11[i]["location"];
        break;
      }
    }

    let value2 = await theatresignupinfo.findOne({
      tName: theatrename,
      city: location,
    });
    value2 = value2.tReferenceNumber;

    let value3 = await snackinfo.findOne({ tReferenceNumber: value2 });
    value3 = value3.snackarr;

    // console.log(value3);

    res.clearCookie("TicketIdForSnacks");

    // console.log({
    //   TicketId: ticketid,
    //   fooditem: value3,
    //   ticketarr: ticketarr,
    // });
  
    res.json({
      TicketId: ticketid,
      fooditem: value3,
      ticketarr: ticketarr,
    });}
    else{
      res.json({
        TicketId: [],
        fooditem: [],
        ticketarr: [],
      });
    }
  } 
  // else res.redirect("/login");
);


router.post("/", async (req, res) => {
  let ticketid = req.body.Ticketid;

  res.cookie("TicketIdForSnacks", ticketid);

  res.json({k:1});
});

module.exports = router;