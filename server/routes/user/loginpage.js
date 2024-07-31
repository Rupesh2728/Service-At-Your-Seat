const express = require("express");
const router = express.Router();
const md5 = require("md5");
//database
const userinfo = require("../../models/user/signup");

const validation = (req, res, next) => {
  const { email, password } = req.body;
  if (email !== undefined && password !== undefined && email !== '' && password !== '') {
    next();
  } else {
    res.status(400).send('Invalid request: Email and password are required.');
  }
};

router.use(validation);


router.post("/", function (req, res) {

  let email = req.body.email;
  let password = md5(req.body.password);

  userinfo.find({ email: email, LoginPassword: password }).then((value) => {
    if (value.length == 0) {
      res.status(400).json({
        result: "error",
      });
    } else {

      console.log("User Login success");
      // req.session.UserReferenceNumber= value[0].UserReferenceNumber; //Ass
      res.cookie("UserReferenceNumber", value[0].UserReferenceNumber,
        {
          httpOnly: true,
          expires: token.expiresIn,
          secure:true,
          sameSite:'none',
          }
      );
      if (email == "saysadmin@gmail.com") {
        res.cookie("islogin", "admin");
        // req.session.islogin= "admin";
        res.status(200).json({
          result: "adminhome"
        })
      }
      else{
        res.cookie("islogin", "user");
        // req.session.islogin= "user";
        res.status(200).json({
          result: "home",
          UserReferenceNumber: value[0].UserReferenceNumber
        });
      }
       
    }
  });
});

module.exports = router;
