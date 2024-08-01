const express = require("express");
const router = express.Router();


//Database
const theatresignupinfo = require("../../models/theatre/signup");
const theatrereviewdata = require("../../models/user/theatrereview");
const userinfo = require("../../models/user/signup");



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