const express = require("express");
const router = express.Router();
const md5 = require("md5");

//Database
const theatresignupinfo = require("../../models/theatre/signup");



router.post("/", async function (req, res) {
  let email = req.body.email;
  let License_Number = req.body.License;
  let password = md5(req.body.password);



  let value = await theatresignupinfo
    .find({
      temail: email,
      licensenum: License_Number,
      LoginPassword: password,
    })

  if (value.length == 0) {
    res.status(400).json({
      result: "error",
    });
  }
  else {
    console.log("TLogin success");
    res.cookie("currtheatrereffnum", value[0].tReferenceNumber,process.env.options);
    let k =
      value[0].city.charAt(0).toUpperCase() +
      value[0].city.slice(1).toLowerCase();
   res.cookie("currtheatrecity", k, process.env.options);
   res.cookie("islogin","theatre",process.env.options);
    res.status(200).json({
      result: "theatre",
      currtheatrereffnum: value[0].tReferenceNumber,
      currtheatrecity: k
    });
  }

});


router.post("/checktheatre", function (req, res) {
  let k = 0;
  let { email } = req.body;
  theatresignupinfo.find({ temail: email }).then((value) => {
    if (value.length != 0) {
      k = 1;
    }

    res.json({ k: k });
  })
});





module.exports = router;