const express = require("express");
const router = express.Router();
//Database
const theatresignupinfo = require("../../models/theatre/signup");
const theatrerentedmovieinfo = require("../../models/theatre/theatremovie");
const movieinfo = require("../../models/theatre/movieinfo");
const moviereviewdata = require("../../models/user/Moviereview");
const movieshowinfo = require("../../models/theatre/movieshowdetails");
const ticketinfo = require("../../models/user/ticketsinfo");
const screeninfo = require("../../models/theatre/theatrescreen");
const showdatailsinfo = require("../../models/theatre/movieshowdetails");
const citymovie = require("../../models/theatre/citymovie");

function convertdate(inputDate) {
  // inputDate = '28th June,2021'------>2021-06-28

  const date = new Date(inputDate.replace(/(st|nd|rd|th)/, ""));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  return formattedDate;
}
async function CheckLatestMoviesForReviewHub(reviewdata) {

  let reviewdataX=[];
  for (let i = 0; i < reviewdata.length; i++) {
    let myobj2 = { movie: reviewdata[i]["MovieName"] };
    
    let x = await moviereviewdata.find(myobj2).sort({ rating: -1 }).limit(1);

   
    if (x.length != 0) {
     
      reviewdataX.push({...reviewdata[i],rating:x[0]["rating"],reviewdesc:x[0]["reviewdesc"]});
      
   
    } else {
      reviewdataX.push({...reviewdata[i],rating:"",reviewdesc:""});
      
    }
  }

  return reviewdataX;
}
async function fillLatestandUpcoming(datevalue, city, latestmovies1, upcomingmovies1, reviewdata1) {
  const date2 = new Date();
  const today = date2.toISOString().slice(0, 10);
  let checkrepeatedmovies = [];


  let value1 = await citymovie.find({ city: city });

  if (value1.length == 0) {
    return;
  }



  for (let i = 0; i < value1[0].movies.length; i++) {



    if (checkrepeatedmovies.includes(value1[0].movies[i].MovieId)) {
      continue;
    }



    const date3 = new Date(convertdate(value1[0].movies[i].releasedate));
    let rentaldate = date3.toISOString().slice(0, 10);
    let rentaldays = value1[0].movies[i].rentdays;

    let someDate = new Date(rentaldate);
    let numberOfDaysToAdd = rentaldays;

    let result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    result = new Date(result).toISOString().slice(0, 10);

    if (rentaldate.localeCompare(today) <= 0) {

        latestmovies1.push(value1[0].movies[i]);
        reviewdata1.push(value1[0].movies[i]);
    }
    else {
      upcomingmovies1.push(value1[0].movies[i]);
    }
    checkrepeatedmovies.push(value1[0].movies[i].MovieId);


  }
}



router.post("/", async (req, res) => {
  console.log(req.cookies.islogin);
  if(!req.cookies.islogin){
    res.status(404).json({
      result: "notloggedin"
    });
  }

  else{
    if(req.cookies.islogin!="user" && req.cookies.islogin!="admin")
      {
       res.status(404).json({
         result: "notloggedin"
       });
      }
  }
  

  let default_city = req.body.location;
  let latestmovies = [];
  let upcomingmovies = [];
  let reviewdata = [];
  // let default_city = "Vijayawada";
  const date2 = new Date();
  let today = date2.toISOString().slice(0, 10);
  await fillLatestandUpcoming(today, default_city, latestmovies, upcomingmovies, reviewdata);

  await CheckLatestMoviesForReviewHub(reviewdata);
   
  if(req.cookies.islogin==="user")
  {
    res.json({
      checklocaton: default_city,
      checkLangfileter: "",
      checkGenrefilter: "",
      latestmovies: latestmovies,
      upcomingmovies: upcomingmovies,
      reviewdata: reviewdata,
    });
  }

});


router.get("/individualmovie", async (req, res) => {

  if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
    res.status(404).json({
      result: "notloggedin"
    });
  }

  const mname = req.query.name;
  const mcity = req.query.city;

  let value = await movieinfo.find({ MovieName: mname });

  value = value[0];

  if (req.cookies.isUserLogin)
    res.render("individualpage", { movieobj: value, location: mcity });
  else res.redirect("/login");
});

router.get("/timings", async (req, res) => {

  if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
    res.status(404).json({
      result: "notloggedin"
    });
  }

  const mname = req.query.name;
  const mcity = req.query.city;


  let showdetailsarray = [];
  let timingsarray = [];
  let obj = {};
  let timevalue;

  let flag = false;
  // 
  // let value = await movieinfo.find({ MovieName: mname });
  // value = value[0];


  let value1 = await theatresignupinfo.find({ city: mcity });
  for (let i = 0; i < value1.length; i++) {
    let value2 = await movieshowinfo.findOne({
      tReferenceNumber: value1[i].tReferenceNumber,
    });
    if (value2 != null)
      movietimearray = value2.showdetails;

    for (let i = 0; i < movietimearray.length; i++) {
      if (movietimearray[i].MovieName == mname) {
        flag = true;

        let time = movietimearray[i].showtime + " " + movietimearray[i].ampm;
        if (req.cookies.timefilter) {
          if (time == req.cookies.timefilter) {
            timingsarray.push(time);
            timevalue = time;
          }
        } else {
          timingsarray.push(time);
          timevalue = "Show All";
        }
      }
    }

    if (flag && timingsarray.length != 0) {
      timingsarray.sort((a, b) => {
        const timeA = new Date("01/01/2000 " + a);
        const timeB = new Date("01/01/2000 " + b);
        return timeA - timeB;
      });
      obj.tReff = value1[i].tReferenceNumber;
      obj.tName = value1[i].tName;
      obj.timingsarray = timingsarray;
      timingsarray = [];

      showdetailsarray.push(obj);
      obj = {};
      flag = false;
    } else {
      timevalue = req.cookies.timefilter;
    }
  }

  res.clearCookie("timefilter");

  res.json({
    timevalue: timevalue,
    // movieobj: value,
    showdetailsarray: showdetailsarray,
  });

});

router.post("/timings", async function (req, res) {
  let timeselected = req.body.time;
  let name = req.query.name;
  let city = req.query.city;
  if (timeselected != "Show All") {
    res.cookie("timefilter", timeselected);
  }
  res.redirect("/movies/timings?name=" + name + "&" + "city=" + city);
});


router.post("/seatarrangement/getseatarr", async function (req, res) {
  
  if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
    res.status(404).json({
      result: "notloggedin"
    });
  }

  let tReff = req.body.tReff;
  let screenname = req.body.sname;
  let userbookingseatarr;
  let numrows, numcols;
  let screendetails = await screeninfo.find({ tReferenceNumber: tReff });
  screendetails = screendetails[0]["Screens"];
  for (let i = 0; i < screendetails.length; i++) {
    if (screendetails[i]["screenname"] == screenname) {
      userbookingseatarr = screendetails[i]["userbookingseatarr"];
      numrows = screendetails[i]["numrows"];
      numcols = screendetails[i]["numcols"];
    }
  }
  res.json({
    userbookingseatarr: userbookingseatarr,
    numcols: numcols,
    numrows: numrows,
  });
});


router.post("/seatarrangement/addticket", async function (req, res) {

  if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
    res.status(404).json({
      result: "notloggedin"
    });
  }

  let treff = req.body.tReff;
  let MovieName = req.body.MovieName;
  let ScreenName = req.body.screenname;
  let seatarr = req.body.seatnumarr;
  let stime = req.body.time;

  let value1 = await movieinfo.find({ MovieName: MovieName });
  let imgurl = value1[0]["imgurl"];
  let currtid;
  console.log(req.cookies.UserReferenceNumber);
  let value2 = await ticketinfo.find({
    UserReferenceNumber: req.cookies.UserReferenceNumber,
  });
  if (value2.length == 0) {
    let newdocument = new ticketinfo();
    newdocument.UserReferenceNumber = req.cookies.UserReferenceNumber;
    newdocument.Ticketinfo = [];
    newdocument
      .save()
      .then(() => {
        console.log("Inserted new document in ticketifo database");
      })
      .catch((err) => {
        console.log(err);
      });

    currtid = "SAYS1001";
  } else {
    let lastticketid =
      value2[0]["Ticketinfo"][value2[0]["Ticketinfo"].length - 1]["TicketId"];
    lastticketid = lastticketid.slice(4);
    lastticketid = Number(lastticketid);
    lastticketid += 1;
    currtid = "SAYS" + lastticketid;
  }

  let value3 = await theatresignupinfo.find({ tReferenceNumber: treff });
  let tname = value3[0]["tName"];
  let loc = value3[0]["city"];

  let obj = {
    TicketId: currtid,
    MovieName: MovieName,
    Movieimgurl: imgurl,
    theatrename: tname,
    location: loc,
    time: stime,
    seats: seatarr,
    screenname: ScreenName,
  };

  let value4 = await ticketinfo.find({
    UserReferenceNumber: req.cookies.UserReferenceNumber,
  });
  value4[0]["Ticketinfo"].push(obj);

  ticketinfo
    .updateOne(
      { UserReferenceNumber: req.cookies.UserReferenceNumber },
      {
        UserReferenceNumber: req.cookies.UserReferenceNumber,
        Ticketinfo: value4[0]["Ticketinfo"],
      }
    )
    .then(() => {
      console.log("Added New Ticket into Db");
      res.json({ k: 1 });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.put("/seatarrangement/updateseatsarr", async function (req, res) {
  if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
    res.status(404).json({
      result: "notloggedin"
    });
  }
   
  let seatarr = req.body.seatarr;
  let treff = req.body.tReff;
  let sname = req.body.sname;
  let value = await screeninfo.find({ tReferenceNumber: treff });
  for (let i = 0; i < value[0]["Screens"].length; i++) {
    if (value[0]["Screens"][i]["screenname"] == sname) {
      value[0]["Screens"][i]["userbookingseatarr"] = seatarr;
      break;
    }
  }

  screeninfo
    .updateOne(
      { tReferenceNumber: treff },
      {
        tReferenceNumber: treff,
        Screens: value[0]["Screens"],
      }
    )
    .then(() => {
      console.log("Updated user screen info in Db");
      res.json({ k: 1 });
    })
    .catch((err) => {
      console.log(err);
    });
});




router.get("/seatarrangement", async (req, res) => {
  
  if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
    res.status(404).json({
      result: "notloggedin"
    });
  }

  const mname = req.query.name;
  const treffnum = req.query.tReff;
  const showtime = req.query.time;
  let premiumprice;
  let normalprice;
  let screenname;
  let userbookingseatarr;
  let showdetailsarray = await showdatailsinfo.find({
    tReferenceNumber: treffnum,
  });
  // if(showdetailsarray[0]["showdetails"]!=null)
  showdetailsarray = showdetailsarray[0]["showdetails"];
  for (let i = 0; i < showdetailsarray.length; i++) {
    if (
      showdetailsarray[i]["MovieName"] == mname &&
      showdetailsarray[i]["showtime"] + " " + showdetailsarray[i]["ampm"] ==
      showtime
    ) {
      screenname = showdetailsarray[i]["screenname"];
      premiumprice = showdetailsarray[i]["pclassprice"];
      normalprice = showdetailsarray[i]["nclassprice"];
    }
  }

  let infoobj = {
    mname: mname,
    tReff: treffnum,
    showtime: showtime,
    premiumprice: premiumprice,
    normalprice: normalprice,
    screenname: screenname,
  };

  let screendetails = await screeninfo.find({ tReferenceNumber: treffnum });
  screendetails = screendetails[0]["Screens"];
  for (let i = 0; i < screendetails.length; i++) {
    if (screendetails[i]["screenname"] == screenname) {
      userbookingseatarr = screendetails[i]["userbookingseatarr"];
    }
  }
  // let movieobj = await movieinfo.findOne({ MovieName: mname });

  res.json({
    // movieobj: movieobj,
    userbookingseatarr: userbookingseatarr,
    infoobj: infoobj,
  });

});



router.post("/searchbar", async function (req, res) {
  let moviename = req.body.moviename;
  let city = req.body.City;

  res.redirect("/movies/individualmovie?name=" + moviename + "&city=" + city);
});

router.post("/getsuggestion", async function (req, res) {
  let city = req.body.city;
  let today = req.body.datevalue;
  let latestmovies = [];
  let upcomingmovies = [];



  await fillLatestandUpcoming(today, city, latestmovies, upcomingmovies);
  res.json(latestmovies);
});



module.exports = router;