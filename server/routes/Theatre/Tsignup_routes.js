const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const md5 = require("md5");

//Database
const theatresignupinfo = require("../../models/theatre/signup");
const theatreverification = require("../../models/Admin/theatreverification");

// router.get("/", function (req, res) {
//   const show_error = req.cookies.show_error;
//   res.clearCookie("show_error");
//   res.render("TSignup", { show_error: show_error });
// });




router.post("/", function (req, res) {

  let Theatre_Name = req.body.Theatre_Name;
  let email = req.body.email;
  let num1 = req.body.Contact_Number1;
  let num2 = req.body.Contact_Number2;
  let street = req.body.Street;
  let City = req.body.City;
  let State = req.body.State;
  let Pincode = req.body.Pincode;
  let License_Number = req.body.License_Number;
  let Login_password = req.body.Login_password;
  let nearbyplace1 = req.body.nearbyplace1;
  let nearbyplace2 = req.body.nearbyplace2;
  let nearbyplace3 = req.body.nearbyplace3;
  let nearbyplace4 = req.body.nearbyplace4;

  const phoneRegex = /^\d{10}$/;
  const pincoderegex = /^[1-9][0-9]{5}$/;
  var License_Numberregex = /^\w{6}$/;

  let flag = false;
  let row;

  let email_len = email.length;

  if (email_len < 10 && !flag) {
    res.json("Email should be greater than length 10");
    flag = true;

  }

  let i = email_len - 1;
  let str = "";

  for (let j = 0; j < 10; j++) {
    str += email.charAt(i);
    i--;
  }
  str = str.split("").reverse().join("");

  if (str != "@gmail.com" && !flag) {
    res.json("Email should have domain as @gmail.com");
    flag = true;

  }

  if (!phoneRegex.test(num1) && !flag) {
    res.json("Enter correct Mobile number");
    flag = true;

  }

  if (!phoneRegex.test(num2) && !flag) {
    res.json("Enter correct Mobile number");
    flag = true;

  }
  if (!pincoderegex.test(Pincode) && !flag) {
    res.json("Enter correct pinicode number");
    flag = true;

  }
  if (!License_Numberregex.test(License_Number) && !flag) {
    res.json("Enter correct License Number of length 6");
    flag = true;

  }
  if (Login_password.includes("#")) {
    res.json(
      "passwords should not contain # symbol for security"
    );
    flag = true;

  }
  if (Login_password.length < 8 && !flag) {
    res.json("Login password should greater than length 8");
    flag = true;

  }
  if (
    Login_password.charAt(0) != Login_password.charAt(0).toUpperCase() &&
    !flag
  ) {
    res.json(
      "Login password first character should be capital"
    );
    flag = true;

  }
  if (!flag) {
    theatresignupinfo.find({ licensenum: License_Number }).then((value) => {
      //    console.log(value);
      if (value.length != 0) {
        res.json("License Number already registered");

      } else {
        theatresignupinfo.find({ email: email }).then((value) => {
          if (value.length != 0) {
            res.json("Email already registered");

          } else {
            let TheatreReferenceNumber = "SAYSTheatre" + email;

            let a = [
              TheatreReferenceNumber,
              Theatre_Name,
              email,
              num1,
              num2,
              street,
              City,
              State,
              Pincode,
              License_Number,
              md5(Login_password),
              nearbyplace1,
              nearbyplace2,
              nearbyplace3,
              nearbyplace4,
            ];

            let b = [
              "tReferenceNumber",
              "tName",
              "temail",
              "tNumber1",
              "tNumber2",
              "street",
              "city",
              "state",
              "pincode",
              "licensenum",
              "LoginPassword",
              "nearbyplace1",
              "nearbyplace2",
              "nearbyplace3",
              "nearbyplace4",
            ];

            let registration = new theatreverification();

            for (let i = 0; i < b.length; i++) {
              registration[b[i]] = a[i];
            }

            registration
              .save()
              .then(() => {
                console.log(
                  "Inserted TSignup data in  theatre verification database"
                );


                let mailtransporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: "contactsays123@gmail.com",
                    pass: "hhbemttmmjnxzfri",
                  },
                });

                let details = {
                  from: "contactsays123@gmail.com",
                  to: email,
                  subject: "Theatre Sent for Verification",
                  text: "Dear Theatre,Theatre Sent for Verification.It may take 2 or 3 Working Days.Please be Patient.",
                };
                mailtransporter.sendMail(details, (err) => {
                  if (err) console.log(err);
                  else {
                    sentdata = "Email has been sent successfully";
                    console.log("Email has sent!!!");
                  }
                });

                res.json("/login");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
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