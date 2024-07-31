const express = require("express");
const router = express.Router();


//Database
const movieinfo = require("../../models/theatre/movieinfo");
const moviereviewdata = require("../../models/user/Moviereview");
const userinfo = require("../../models/user/signup");


/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get movie details and reviews
 *     tags: [USER REVIEWS]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Name of the movie
 *         schema:
 *           type: string
 *           example: "Avatar"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movieobj:
 *                   type: object
 *                   description: Details of the requested movie
 *                   example: 
 *                     _id: "6448b8c279bd78711b0f69e5"
 *                     MovieName: "Avatar"
 *                     Director: "James Cameron"
 *                     ReleaseDate: "2009-12-18"
 *                 reviewdata:
 *                   type: array
 *                   description: Reviews of the requested movie
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier of the review
 *                       movie:
 *                         type: string
 *                         description: Name of the movie
 *                       rating:
 *                         type: number
 *                         description: Rating of the movie
 *                         example: 4.5
 *                       comment:
 *                         type: string
 *                         description: Comment about the movie
 *                         example: "Great movie, loved the special effects!"
 *       '404':
 *         description: User is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Indicates that the user is not logged in
 *                   example: notloggedin
 *       '500':
 *         description: Some error happened
 */


router.get("/", async (req, res) => {
   
  if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
    res.status(404).json({
      result: "notloggedin"
    });
  }
    
    const mname = req.query.name;
    var movieobj;
   
      movieobj = await movieinfo.findOne({ MovieName: mname });
  
      let myobj2 = { movie: mname };
      let x = await moviereviewdata.find(myobj2);
      res.json({ movieobj: movieobj, reviewdata: x });
  });

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Post a review for a movie
 *     tags: [USER REVIEWS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the movie
 *               review:
 *                 type: string
 *                 description: User's review of the movie
 *               rating:
 *                 type: number
 *                 description: Rating given by the user for the movie
 *                 minimum: 0
 *                 maximum: 5
 *     responses:
 *       '200':
 *         description: Review successfully posted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 k:
 *                   type: integer
 *                   description: Indicates successful review posting
 *                   example: 1
 *       '404':
 *         description: User is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Indicates that the user is not logged in
 *                   example: notloggedin
 *       '500':
 *         description: Internal server error
 */

router.post("/", async (req, res) => {
      
  if(req.cookies.islogin!="user"&&req.cookies.islogin!="admin"){
    res.status(404).json({
      result: "notloggedin"
    });
  }
      
    const mname = req.query.name;
    review1 = req.body.review;
    rating1 = req.body.rating;
  
    let userdata = await userinfo.findOne({
      UserReferenceNumber: req.cookies.UserReferenceNumber,
    });
  
    let Person = userdata.firstName;
  
    let myobj1 = {
      movie: mname,
      criticname: Person,
      rating: rating1,
      reviewdesc: review1,
    };
    let reviewmodel = new moviereviewdata(myobj1);
    await reviewmodel.save();
    res.json({k:1});
  });

  module.exports = router;