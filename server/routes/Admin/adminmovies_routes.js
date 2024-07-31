const express = require("express");
const router = express.Router();

//Database
const movieinfo = require("../../models/theatre/movieinfo.js");
const rentalmovieinfo = require("../../models/theatre/rentalmovieslist.js");



/**
 * @swagger
 * /Adminmovies:
 *   get:
 *     summary: Retrieve rental movie information
 *     tags: [ADMIN MOVIES]
 *     description: |
 *       This endpoint allows an admin to retrieve information about rental movies.
 *       Only admins are allowed to access this endpoint.
 *     responses:
 *       '200':
 *         description: Rental movie information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rentalmoviearr:
 *                   type: array
 *                   description: Array of rental movie information
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Movie ID
 *                       MovieName:
 *                         type: string
 *                         description: Name of the movie
 *                       imgurl:
 *                         type: string
 *                         description: URL of the movie image
 *                       releasedate:
 *                         type: string
 *                         format: date
 *                         description: Release date of the movie
 *                       duration:
 *                         type: string
 *                         description: Duration of the movie
 *                       genre:
 *                         type: string
 *                         description: Genre of the movie
 *                       about:
 *                         type: string
 *                         description: Description of the movie
 *                 rentalmovieslocarr:
 *                   type: array
 *                   description: Array of locations where rental movies are available
 *                   items:
 *                     type: string
 *                     description: Location name
 *       '404':
 *         description: Admin authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message indicating admin authentication failure
 *                   example: "Admin Should login"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

router.get("/", async function (req, res) {



  // if (req.cookies.islogin != "admin") {
  //   res.status(404).json({
  //     result: "Admin Should login"
  //   });
  // }
  try {
    const cachedData = await redis.get('Admin_Movies');
    if (cachedData) {
      console.log('Data retrieved from cache');
      // console.log(JSON.parse(cachedData));
      return res.json(cachedData);
    }

    let rentalmoviearr = await movieinfo.find({});
    let value1 = await rentalmovieinfo.find({});
    let rentalmovieslocarr = [];
    for (let i = 0; i < value1.length; i++) {
      if (!rentalmovieslocarr.includes(value1[i]["city"])) {
        rentalmovieslocarr.push(value1[i]["city"]);
      }
    }
    data = {
      rentalmoviearr: rentalmoviearr,
      rentalmovieslocarr: rentalmovieslocarr,
    }
    await redis.set('Admin_Movies', JSON.stringify(data));
    res.status(200).json(data);
  }
  catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

});






/**
 * @swagger
 * /Adminmovies/adminrentalmovieinfo:
 *   post:
 *     summary: Add rental movie information
 *     tags: [ADMIN MOVIES]
 *     description: |
 *       This endpoint allows an admin to add information about rental movies.
 *       Only admins are allowed to access this endpoint.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mName:
 *                 type: string
 *                 description: Name of the movie
 *               theatreimgurl:
 *                 type: string
 *                 description: URL of the movie image
 *               lang:
 *                 type: string
 *                 description: Language of the movie
 *               rd:
 *                 type: string
 *                 format: date
 *                 description: Release date of the movie
 *               duration:
 *                 type: string
 *                 description: Duration of the movie
 *               genre:
 *                 type: string
 *                 description: Genre of the movie
 *               locs:
 *                 type: string
 *                 description: Comma-separated list of locations where the movie is available
 *               cn1:
 *                 type: string
 *                 description: Name of cast member 1
 *               cimg1:
 *                 type: string
 *                 description: Image URL of cast member 1
 *               cn2:
 *                 type: string
 *                 description: Name of cast member 2
 *               cimg2:
 *                 type: string
 *                 description: Image URL of cast member 2
 *               cn3:
 *                 type: string
 *                 description: Name of cast member 3
 *               cimg3:
 *                 type: string
 *                 description: Image URL of cast member 3
 *               cn4:
 *                 type: string
 *                 description: Name of cast member 4
 *               cimg4:
 *                 type: string
 *                 description: Image URL of cast member 4
 *               cn5:
 *                 type: string
 *                 description: Name of cast member 5
 *               cimg5:
 *                 type: string
 *                 description: Image URL of cast member 5
 *               about:
 *                 type: string
 *                 description: Description of the movie
 *     responses:
 *       '200':
 *         description: Rental movie information added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Success message
 *               example: "added"
 *       '404':
 *         description: Admin authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message indicating admin authentication failure
 *                   example: "Admin Should login"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */




router.post("/adminrentalmovieinfo", async function (req, res) {
  // if (req.cookies.islogin != "admin") {
  //   res.status(404).json({
  //     result: "Admin Should login"
  //   });
  // }
  let mName = req.body.mName;
  let theatreimgurl = req.body.theatreimgurl;
  let lang = req.body.lang;
  let rd = req.body.rd;
  let duration = req.body.duration;
  let genre = req.body.genre;
  let locs = req.body.locs;
  let cn1 = req.body.cn1;
  let cimg1 = req.body.cimg1;
  let cn2 = req.body.cn2;
  let cimg2 = req.body.cimg2;
  let cn3 = req.body.cn3;
  let cimg3 = req.body.cimg3;
  let cn4 = req.body.cn4;
  let cimg4 = req.body.cimg4;
  let cn5 = req.body.cn5;
  let cimg5 = req.body.cimg5;
  let aboutmovie = req.body.about;
  let mid = "SAYS@" + mName;

  let value = await movieinfo.find({ MovieId: mid });
  if (value.length == 0) {
    let newdocument = new movieinfo();
    newdocument.MovieName = mName;
    newdocument.MovieId = mid;
    newdocument.imgurl = theatreimgurl;
    newdocument.releasedate = rd;
    newdocument.duration = duration;
    newdocument.genre = genre;
    newdocument.about = aboutmovie;
    newdocument.language = lang;
    let castobjarr = [
      {
        castname: cn1,
        castimg: cimg1,
      },

      {
        castname: cn2,
        castimg: cimg2,
      },

      {
        castname: cn3,
        castimg: cimg3,
      },

      {
        castname: cn4,
        castimg: cimg4,
      },

      {
        castname: cn5,
        castimg: cimg5,
      },
    ];

    newdocument.cast = castobjarr;
    let value2 = await newdocument.save();
    if (value2) {
      console.log("New Document Added to movie info with data");
    }
  }

  let locsarr = locs.split(",");
  for (let i = 0; i < locsarr.length; i++) {
    locsarr[i] =
      locsarr[i].charAt(0).toUpperCase() + locsarr[i].slice(1).toLowerCase();
  }

  let rentalarrobj = [];
  for (let i = 0; i < locsarr.length; i++) {
    let obj1 = {
      MovieId: mid,
      MovieName: mName,
      city: locsarr[i],
    };

    rentalarrobj.push(obj1);
  }

  let value3 = await rentalmovieinfo.insertMany(rentalarrobj);
  if (value3) {
    console.log("Rental movies inserted ");
  }

  let rentalmoviearr = await movieinfo.find({});
  let value1 = await rentalmovieinfo.find({});
  let rentalmovieslocarr = [];
  for (let i = 0; i < value1.length; i++) {
    if (!rentalmovieslocarr.includes(value1[i]["city"])) {
      rentalmovieslocarr.push(value1[i]["city"]);
    }
  }
  data = {
    rentalmoviearr: rentalmoviearr,
    rentalmovieslocarr: rentalmovieslocarr,
  }
  await redis.set('Admin_Movies', JSON.stringify(data));
  res.json("added");
});

/**
 * @swagger
 * /Adminmovies/adminremovemovie:
 *   delete:
 *     summary: Remove a movie by the admin
 *     tags: [ADMIN MOVIES]
 *     description: |
 *       This endpoint allows an admin to remove a movie along with its rental information.
 *       Only admins are allowed to access this endpoint.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               moviename:
 *                 type: string
 *                 description: Name of the movie to be removed
 *             example:
 *               moviename: "Movie Name"
 *     responses:
 *       '200':
 *         description: Movie removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 k:
 *                   type: number
 *                   description: Success indicator
 *                   example: 1
 *       '404':
 *         description: Admin authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message indicating admin authentication failure
 *                   example: "Admin Should login"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */


router.delete("/adminremovemovie", async function (req, res) {

  // if (req.cookies.islogin != "admin") {
  //   res.status(404).json({
  //     result: "Admin Should login"
  //   });
  // }

  let mName = req.body.moviename;
  let value1 = await movieinfo.find({ MovieName: mName });
  let mid = value1[0]["MovieId"];

  await movieinfo.deleteOne({ MovieId: mid });
  await rentalmovieinfo.deleteMany({ MovieId: mid });
  console.log("Movie Removed by Admin");

  let rentalmoviearr = await movieinfo.find({});
  let value11 = await rentalmovieinfo.find({});
  let rentalmovieslocarr = [];
  for (let i = 0; i < value11.length; i++) {
    if (!rentalmovieslocarr.includes(value11[i]["city"])) {
      rentalmovieslocarr.push(value11[i]["city"]);
    }
  }
  data = {
    rentalmoviearr: rentalmoviearr,
    rentalmovieslocarr: rentalmovieslocarr,
  }
  await redis.set('Admin_Movies', JSON.stringify(data));
  res.json({ k: 1 });
});


/**
 * @swagger
 * /Adminmovies/getmovieinfo:
 *   post:
 *     summary: Get movie information by the admin
 *     tags: [ADMIN MOVIES]
 *     description: |
 *       This endpoint allows an admin to retrieve information about a movie.
 *       Only admins are allowed to access this endpoint.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mname:
 *                 type: string
 *                 description: Name of the movie to retrieve information about
 *             example:
 *               mname: "Movie Name"
 *     responses:
 *       '200':
 *         description: Movie information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the movie document
 *                   example: "64398d76b61ebb7b0a62b03a"
 *                 MovieName:
 *                   type: string
 *                   description: Name of the movie
 *                   example: "Movie Name"
 *                 MovieId:
 *                   type: string
 *                   description: Unique identifier of the movie
 *                   example: "SAYS@MovieName"
 *                 imgurl:
 *                   type: string
 *                   description: URL of the movie image
 *                   example: "https://example.com/movie_image.jpg"
 *                 releasedate:
 *                   type: string
 *                   format: date
 *                   description: Release date of the movie
 *                   example: "2024-05-01"
 *                 duration:
 *                   type: string
 *                   description: Duration of the movie
 *                   example: "2h 30m"
 *                 genre:
 *                   type: string
 *                   description: Genre of the movie
 *                   example: "Action, Adventure"
 *                 about:
 *                   type: string
 *                   description: Description about the movie
 *                   example: "This is an action-packed adventure movie."
 *                 language:
 *                   type: string
 *                   description: Language of the movie
 *                   example: "English"
 *                 cast:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       castname:
 *                         type: string
 *                         description: Name of the cast member
 *                         example: "Actor Name"
 *                       castimg:
 *                         type: string
 *                         description: URL of the cast member's image
 *                         example: "https://example.com/actor_image.jpg"
 *       '404':
 *         description: Admin authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Error message indicating admin authentication failure
 *                   example: "Admin Should login"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */


router.post("/getmovieinfo", async function (req, res) {

  // if (req.cookies.islogin != "admin") {
  //   res.status(404).json({
  //     result: "Admin Should login"
  //   });
  // }

  let mname = req.body.mname;
  let value1 = await movieinfo.find({ MovieName: mname });
  let movieobj = value1[0];
  res.status(200).json(movieobj);
});

module.exports = router;