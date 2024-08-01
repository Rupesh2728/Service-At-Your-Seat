const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
      
  if(req.cookies.islogin!="theatre"){
    res.status(404).json({
      result: "notloggedin"
    });
  }


    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.clearCookie("islogin");
    res.clearCookie("currtheatrecity");
    res.clearCookie("currtheatrereffnum");
    res.json({result:"signed out"});
  });

module.exports = router;

