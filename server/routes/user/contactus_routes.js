const express = require("express");
const router = express.Router();

//Database
const contactusqueries = require("../../models/Admin/contactusqueries");
const userinfo = require("../../models/user/signup");

router.get("/", async function (req, res) {
    // const show_error_contactus = req.cookies.show_error_contactus;
    // res.clearCookie("show_error_contactus");
  
    let value = await contactusqueries.find({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });

    if (value.length == 0) {
      let newdocument = new contactusqueries();
      newdocument.UserReferenceNumber = req.cookies.UserReferenceNumber;
      newdocument.msginfo = [];
      newdocument
        .save()
        .then(() => {
          console.log("Inserted new contactus query data in database");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    let value2=await userinfo.find({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });

    const user=value2[0];
    res.json({email:user.email,name:(user.firstName+" "+user.lastName)});
  
    // if (req.cookies.isUserLogin)
    //   res.render("contactus", { show_error_contactus: show_error_contactus });
    // else res.redirect("/login");
  });




  router.post("/", async function (req, res) {
    let email = req.body.email;
    let message = req.body.message;
    let uname = req.body.uname;
    // let flag = false;
  
    // if (!flag) {
    //   res.cookie(
    //     "show_error_contactus",
    //     "Message sent successfully(Back to Home.........)"
    //   );
  
      const currentDate = new Date();
      const isoDate = currentDate.toISOString().slice(0, 10);
      console.log(isoDate);
  
      let obj = {
        UserReferenceNumber: req.cookies.UserReferenceNumber,
        mailid: email,
        name: uname,
        message: message,
        date: isoDate,
      };
      let value = await contactusqueries.find({
        UserReferenceNumber: req.cookies.UserReferenceNumber,
      });
      value[0]["msginfo"].push(obj);
      await contactusqueries.updateOne(
        { UserReferenceNumber: req.cookies.UserReferenceNumber },
        value[0]
      );
      res.json({k:1});
    });

  module.exports = router;