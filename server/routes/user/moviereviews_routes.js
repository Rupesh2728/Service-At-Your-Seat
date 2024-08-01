const express = require("express");
const router = express.Router();


//Database
const movieinfo = require("../../models/theatre/movieinfo");
const moviereviewdata = require("../../models/user/Moviereview");
const userinfo = require("../../models/user/signup");


router.get("/", async (req, res) => {
   
  if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
    res.status(404).json({
      result: "notloggedin"
    });
  }
    
    const mname = req.query.name;
    var movieobj;
   
      movieobj = await movieinfo.findOne({ MovieName: mname });
  
      let myobj2 = { movie: mname };
      let x = await moviereviewdata.find(myobj2);
      res.json({ movieobj: movieobj, reviewdata: x });
  });


router.post("/", async (req, res) => {
      
  if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
    res.status(404).json({
      result: "notloggedin"
    });
  }
      
    const mname = req.query.name;
    review1 = req.body.review;
    rating1 = req.body.rating;
  
    let userdata = await userinfo.findOne({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
  
    let Person = userdata.firstName;
  
    let myobj1 = {
      movie: mname,
      criticname: Person,
      rating: rating1,
      reviewdesc: review1,
    };
    let reviewmodel = new moviereviewdata(myobj1);
    await reviewmodel.save();
    res.json({k:1});
  });

  module.exports = router;