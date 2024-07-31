const express = require("express");
const router = express.Router();
const userinfo = require("../../models/user/signup");
const md5 = require("md5");

router.get("/", function (req, res) {
  const show_error = req.cookies.show_error;
  res.clearCookie("show_error");

  res.render("Signup", { show_error: show_error });
});


/**
 * @swagger
 * /Signup:
 *   post:
 *     summary: Sign up for a new user account
 *     tags: [USER SIGNUP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               First_Name:
 *                 type: string
 *                 description: First name of the user
 *               Last_Name:
 *                 type: string
 *                 description: Last name of the user
 *               DOB:
 *                 type: string
 *                 description: Date of birth of the user
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *               Mobile_Number:
 *                 type: string
 *                 description: Mobile number of the user
 *               gender:
 *                 type: string
 *                 description: Gender of the user
 *               Login_password:
 *                 type: string
 *                 description: Password for logging in
 *               Profile_password:
 *                 type: string
 *                 description: Password for profile access
 *               Card_Name:
 *                 type: string
 *                 description: Name on the card
 *               Card_Number:
 *                 type: string
 *                 description: Card number
 *               CVV:
 *                 type: string
 *                 description: CVV of the card
 *               Expiry:
 *                 type: string
 *                 description: Expiry date of the card
 *     responses:
 *       '200':
 *         description: Successful sign-up
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Redirect URL to login page
 *               example: "/login"
 *       '400':
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Error message indicating the validation issue
 *       '500':
 *         description: Internal server error
 */







// Custom Middleware
const validation = (req, res, next) => {
  let email = req.body.email;
  let num = req.body.Mobile_Number;
  let Login_password = req.body.Login_password;
  let Profile_password = req.body.Profile_password;
  let CardName = req.body.Card_Name;
  let CardNum = req.body.Card_Number;
  let CVV = req.body.CVV;
  let Expiry = req.body.Expiry;
  let DOB = req.body.DOB;
  let gender = req.body.gender;

  //
  const phoneRegex = /^\d{10}$/;
  const alphabetRegex = /^[a-zA-Z]+$/;
  const cardNumberRegex = /^\d{16}$/;
  const numbersRegex = /^[0-9]{3}$/;
  const numbersRegex2 = /^[0-9]{2}$/;
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

  if (!phoneRegex.test(num) && !flag) {
    res.json("Enter correct Mobile number");
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

  if (Profile_password.includes("#")) {
    res.json(

      "passwords should not contain # symbol for security"
    );
    flag = true;

  }

  if (Profile_password.length < 8 && !flag) {
    res.json("Profile password should greater than length 8");
    flag = true;

  }
  if (
    Profile_password.charAt(0) != Profile_password.charAt(0).toUpperCase() &&
    !flag
  ) {
    res.json(

      "Profile password first character should be capital"
    );
    flag = true;

  }

  if (!alphabetRegex.test(CardName) && !flag) {
    res.json("Enter correct Crad Holder Name");
    flag = true;

  }

  if (!cardNumberRegex.test(CardNum) && !flag) {
    res.json("Enter correct 16 digit Crad Number");
    flag = true;

  }

  if (!numbersRegex.test(CVV) && !flag) {
    res.json("Enter correct CVV");
    flag = true;

  }
  if (!numbersRegex2.test(Expiry) && !flag) {
    res.json("Enter correct two digit expiry year");
    flag = true;

  }

  if (!flag) {
    userinfo.find({ email: email }).then((value) => {
      if (value.length != 0) {
        res.json("Email already registered");

      } else {
        let UserReferenceNumber = "SAYSUSER" + email;

        let a = [
          UserReferenceNumber,
          req.body.First_Name,
          req.body.Last_Name,
          DOB,
          email,
          num,
          gender,
          md5(Login_password),
          md5(Profile_password),
          CardName,
          CardNum,
          md5(CVV),
          md5(Expiry),
        ];

        let b = [
          "UserReferenceNumber",
          "firstName",
          "lastName",
          "DOB",
          "email",
          "MobileNumber",
          "Gender",
          "LoginPassword",
          "profilePassword",
          "cardName",
          "cardNumber",
          "CVV",
          "expiry",
        ];

        let registration = new userinfo();

        for (let i = 0; i < b.length; i++) {
          registration[b[i]] = a[i];
        }

        registration
          .save()
          .then(() => {
            console.log("Inserted Signup data in database");
            res.json("/login");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
  next(); // Call the next middleware in the stack
};

// Use the custom middleware for all routes
// router.use(validation);



router.post("/", validation, function (req, res) {



  // res.json("Enter correct details");



});

router.post("/checkuser", function (req, res) {
  let k = 0;
  let { email } = req.body;
  userinfo.find({ email: email }).then((value) => {
    if (value.length != 0) {
      k = 1;
    }

    res.json({ k: k });
  })
});




module.exports = router;