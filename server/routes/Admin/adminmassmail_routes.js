const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const userinfo=require("../../models/user/signup");
const theatresignupinfo = require("../../models/theatre/signup");





router.post("/", async function (req, res) {

  // if(req.cookies.islogin!="admin"){
  //   res.status(404).json({
  //     result: "Admin Should login"
  //   });
  // }

  let subject = req.body.subject;
  let message = req.body.message;
  let toaddress2 = req.body.tomail;
  let toaddress = req.body.toaddress;
  // let fromaddress = req.body.fromaddress;
  let emailarr = [];
  if (toaddress == "None" && toaddress2 != "") {
    emailarr.push(toaddress2);
  } else if (toaddress == "Both") {
    let value = await theatresignupinfo.find({});
    let value2 = await userinfo.find({});
    for (let i = 0; i < value.length; i++) {
      emailarr.push(value[i]["temail"]);
    }

    for (let i = 0; i < value2.length; i++) {
      emailarr.push(value2[i]["email"]);
    }
  } else if (toaddress == "All Users") {
    let value2 = await userinfo.find({});
    for (let i = 0; i < value2.length; i++) {
      emailarr.push(value2[i]["email"]);
    }
  } else if (toaddress == "All Theatres") {
    let value = await theatresignupinfo.find({});
    for (let i = 0; i < value.length; i++) {
      emailarr.push(value[i]["temail"]);
    }
  }

  let mailtransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "contactsays123@gmail.com",
      pass: "hhbemttmmjnxzfri",
    },
  });

  let details = {
    from: "contactsays123@gmail.com",
    to: emailarr,
    subject: subject,
    text: message,
  };
  mailtransporter.sendMail(details, (err) => {
    if (err) console.log(err);
    else {
      sentdata = "Email has been sent successfully";
      console.log("Email has sent!!!");
    }
  });

  res.json({k:1});
});

  module.exports = router;