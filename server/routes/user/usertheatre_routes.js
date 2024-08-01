
const express = require("express");
const router = express.Router();

//Database
const userTinfo = require("../../models/theatre/abouttheatre");
const theatresignupinfo = require("../../models/theatre/signup");


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