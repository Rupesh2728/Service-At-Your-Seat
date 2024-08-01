const express = require("express");
const router = express.Router();


//Database 
const ticketinfo = require("../../models/user/ticketsinfo");



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