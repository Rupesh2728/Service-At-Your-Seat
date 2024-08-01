const express = require("express");
const router = express.Router();

//database
const snackinfo = require("../../models/theatre/snackinfo");

router.post("/removesnack", async function (req, res) {

  if(req.cookies.islogin!="theatre"){
    res.status(404).json({
      result: "notloggedin"
    });
  }


    let sname = req.body.sname;
    let category = req.body.category;
    let value = await snackinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    let snackinfoobj = value[0];
    let snackarr = [];
    let newsnackarr = [];
    snackarr = snackinfoobj["snackarr"];
    for (let i = 0; i < snackarr.length; i++) {
      if (snackarr[i].SnackName != sname || snackarr[i].category != category) {
        newsnackarr.push(snackarr[i]);
      }
    }
    
    snackarr = newsnackarr;
    snackinfo
      .updateOne(
        { tReferenceNumber: req.cookies.currtheatrereffnum },
        {
          tReferenceNumber: req.cookies.currtheatrereffnum,
          snackarr: snackarr,
        }
      )
  
      .then(() => {
        console.log("Removed the snack from Snack Info!!!");
        res.json({k:1});
      })
      .catch((err) => {
        console.log(err);
        res.json({k:0});
      });
  });
  
  router.get("/", async function (req, res) {


    if(req.cookies.islogin!="theatre"){
      res.status(404).json({
        result: "notloggedin"
      });
    }


    let snackinfoarr = [];
    let value = await snackinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    if (value.length == 0) {
      let newdocument = new snackinfo();
      newdocument.tReferenceNumber = req.cookies.currtheatrereffnum;
      newdocument.snackarr = [];
      newdocument
        .save()
        .then(() => {
          console.log("Inserted new theatre in tmoviesinfo database");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let snackinfoobj = value[0];
      let arr = snackinfoobj["snackarr"];
      for (let i = 0; i < arr.length; i++) {
        snackinfoarr.push(arr[i]);
      }
    }
       res.json({ snackinfoarr: snackinfoarr });
  });
  
  router.post("/addsnack", async function (req, res) {

    if(req.cookies.islogin!="theatre"){
      res.status(404).json({
        result: "notloggedin"
      });
    }


    let flag = 0;
    let convertstr = function (str) {
      let words = str.split(" ");
      let capitalized = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
      let result = capitalized.join(" ");
      return result;
    };
  
    let sname = convertstr(req.body.sname);
    let scategory = convertstr(req.body.category);
    let sprice = req.body.price;
    let simgurl = req.body.snackimg;
    let value = await snackinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
    if (value.length == 0) {
      let newdocument = new snackinfo();
      newdocument.tReferenceNumber = req.cookies.currtheatrereffnum;
      newdocument.snackarr = [];
      let snackarr = newdocument.snackarr;
      newdocument
        .save()
        .then(() => {
          console.log("Inserted new theatre in tmoviesinfo database");
        })
        .catch((err) => {
          console.log(err);
        });
  
      let snewobj = {
        SnackName: sname,
        category: scategory,
        price: sprice,
        imgurl: simgurl,
      };
  
      snackarr.push(snewobj);
  
      snackinfo
        .updateOne(
          { tReferenceNumber: req.cookies.currtheatrereffnum },
          {
            tReferenceNumber: req.cookies.currtheatrereffnum,
            snackarr: snackarr,
          }
        )
        .then(() => {
          console.log("Inserted new snack data in snackinfo database");
          res.json({k:1});
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let snackarr = value[0]["snackarr"];
      for (let i = 0; i < snackarr.length; i++) {
        if (snackarr[i].SnackName == sname && snackarr[i].category == scategory) {
          flag = 1;
        }
      }
  
      let snewobj = {
        SnackName: sname,
        category: scategory,
        price: sprice,
        imgurl: simgurl,
      };
  
      if (flag == 0) {
        snackarr.push(snewobj);
        snackinfo
          .updateOne(
            { tReferenceNumber: req.cookies.currtheatrereffnum },
            {
              tReferenceNumber: req.cookies.currtheatrereffnum,
              snackarr: snackarr,
            }
          )
          .then(() => {
            console.log("Inserted new snack data in snackinfo database");
            res.json({k:1});
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Already Snack Present in your Theatre");
        res.json({k:1});
      }
    }
  });


  let olddetails = {
    oldsname: "",
    oldscategory: "",
  };

  router.post("/getsnackdetails", function (req, res) {

    if(req.cookies.islogin!="theatre"){
      res.status(404).json({
        result: "notloggedin"
      });
    }

    let sname = req.body.sname;
    let scategory = req.body.category;
    snackinfo
      .find({ tReferenceNumber: req.cookies.currtheatrereffnum })
      .then((value) => {
        let obj = value[0];
        let obj2;
        let snackarr = obj["snackarr"];
        for (let i = 0; i < snackarr.length; i++) {
          if (
            snackarr[i].SnackName == sname &&
            snackarr[i].category == scategory
          ) {
            obj2 = snackarr[i];
            olddetails = {
              oldsname: sname,
              oldscategory: scategory,
            };
          }
        }
        res.json(obj2);
      });
  });

  
  // router.post("/editsavesnack/olddetails", function (req, res) {
  //   let oldsname = req.body.oldsname;
  //   let oldscategory = req.body.oldscategory;
  //   olddetails = {
  //     oldsname: oldsname,
  //     oldscategory: oldscategory,
  //   };
  
  //   res.json({k:1});
  // });
  
  router.post("/editsavesnack", async function (req, res) {

    if(req.cookies.islogin!="theatre"){
      res.status(404).json({
        result: "notloggedin"
      });
    }

    let flag = 0;
    let sname = req.body.esname;
    let scategory = req.body.escategory;
    let sprice = req.body.esprice;
    let simgurl = req.body.esimgurl;
    let value = await snackinfo.find({
      tReferenceNumber: req.cookies.currtheatrereffnum,
    });
  
    let snackarr = value[0]["snackarr"];
    for (let i = 0; i < snackarr.length; i++) {
      if (snackarr[i].SnackName == sname && snackarr[i].category == scategory) {
        flag = 1;
      }
    }
  
    if (flag == 0) {
      for (let i = 0; i < snackarr.length; i++) {
        if (
          snackarr[i].SnackName == olddetails.oldsname &&
          snackarr[i].category == olddetails.oldscategory
        ) {
          snackarr[i].SnackName = sname;
          snackarr[i].category = scategory;
          snackarr[i].price=sprice;
          snackarr[i].imgurl=simgurl;
        }
      }
  
      snackinfo
        .updateOne(
          { tReferenceNumber: req.cookies.currtheatrereffnum },
          {
            tReferenceNumber: req.cookies.currtheatrereffnum,
            snackarr: snackarr,
          }
        )
        .then(() => {
          console.log("Updated new snack data in snackinfo database");
          res.json({k:1});
        })
        .catch((err) => {
          console.log(err);
        });
    } 
    
    
    else {
      for (let i = 0; i < snackarr.length; i++) {
        if (
          snackarr[i].SnackName == sname &&
          snackarr[i].category == scategory
        ) {
          snackarr[i].SnackName = sname;
          snackarr[i].category = scategory;
          snackarr[i].price=sprice;
          snackarr[i].imgurl=simgurl;
        }
      }
  
      snackinfo
        .updateOne(
          { tReferenceNumber: req.cookies.currtheatrereffnum },
          {
            tReferenceNumber: req.cookies.currtheatrereffnum,
            snackarr: snackarr,
          }
        )
        .then(() => {
          console.log("Updated existing snack data in snackinfo database");
          res.json({k:1});
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  

  module.exports = router;