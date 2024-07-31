const express = require("express");

const cors = require('cors');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();






const app = express();
app.use(cors({ origin: true, credentials: true })); // Enable CORS for all routes(all reuestes are accepted 3000,8000 ports creditonals for allownig cookies)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());  

//Cookie
const cookieparser = require("cookie-parser");
app.use(cookieparser());


app.listen(5000, function () {
  console.log("server straed on port 5000");
});





//MongoDB Altas Connection
const mongoose = require("mongoose");

const dburl =process.env.mongodb_URL;



mongoose
  .connect(dburl, {})
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("Failed to connect to mongodb");
  });


//User Routes
const loginpage = require("./routes/user/loginpage");
const signup = require("./routes/user/signup");
const signout = require("./routes/user/signout");
const homeroutes = require("./routes/user/home_routes");
const movieroutes = require("./routes/user/movie_routes");
const userprofileroutes = require("./routes/user/profile_routes");
const snacksroutes = require("./routes/user/snacks_routes");
const recentbookingroutes = require("./routes/user/recentbookings_routes");
const moviereviewroutes = require("./routes/user/moviereviews_routes");
const theatrereviewroutes = require("./routes/user/theatrereview_routes");
const contactusroutes = require("./routes/user/contactus_routes");
const usertheatreprofileroutes = require("./routes/user/usertheatre_routes");




app.use("/login", loginpage);
app.use("/Signup", signup);
app.use("/signout", signout);
app.use("/home", homeroutes);
app.use("/movies", movieroutes);
app.use("/profile", userprofileroutes);
app.use("/snacks", snacksroutes);
app.use("/recentbooking", recentbookingroutes);
app.use("/reviews", moviereviewroutes);
app.use("/treviews", theatrereviewroutes);
app.use("/contactus", contactusroutes);
app.use("/usertheatreprofile", usertheatreprofileroutes);



//Theatre Dashboard Routes
const Tdashboardroutes = require("./routes/Theatre/Tdashboard_routes");
const Tsignuproutes = require("./routes/Theatre/Tsignup_routes");
const Tprofileroutes = require("./routes/Theatre/Tprofile_routes");
const Tsnackspageroutes = require("./routes/Theatre/Tsnackspage_routes");
const Tmdashboardroutes = require("./routes/Theatre/Tmdashboard_routes");
const Tscheduleroutes = require("./routes/Theatre/Tschedule_routes");
const Tloginroutes = require("./routes/Theatre/Tlogin_routes");
const Tsignoutroutes = require("./routes/Theatre/Tsignout");
const userTheatreinforoutes = require("./routes/Theatre/usertheatreinfo_routes");

app.use("/tdashboard", Tdashboardroutes);
app.use("/TSignup", Tsignuproutes);
app.use("/tprofile", Tprofileroutes);
app.use("/tsnackspage", Tsnackspageroutes);
app.use("/tmdashboard", Tmdashboardroutes);
app.use("/tschedule", Tscheduleroutes);
app.use("/Tlogin", Tloginroutes);
app.use("/usertheatreinfo", userTheatreinforoutes);
app.use("/Tsignout", Tsignoutroutes);


//Admin Dashboard Routes
const adminhomeroutes = require("./routes/Admin/adminhome_routes");
const adminmoviesroutes = require("./routes/Admin/adminmovies_routes");
const adminclientroutes = require("./routes/Admin/adminclient_routes");
const admintheatreroutes = require("./routes/Admin/admintheatre_routes");
const adminmassmailroutes = require("./routes/Admin/adminmassmail_routes");

app.use("/adminhome", adminhomeroutes);
app.use("/Adminmovies", adminmoviesroutes);
app.use("/Adminclient", adminclientroutes);
app.use("/Admintheatre", admintheatreroutes);
app.use("/adminmassmail", adminmassmailroutes);




app.use((err, req, res, next) => {
  // console.log("Error Printed");
  console.log(err.message);
  errorStatusCode = err.statusCode || 500;
  res.status(errorStatusCode).json({ error: 'Something broke!' });
  
})


