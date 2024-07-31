import React, { Component } from "react";
import Slider from "react-slick";
import classes from "../ReviewSection.module.css";
import { AiFillStar, AiFillClockCircle } from 'react-icons/ai';
import { BsFillProjectorFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
export default class ReviewHubCaurosel extends Component {


   
  

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      pauseOnHover: true,
      autoplaySpeed: 800,
    };
    return (
      <div>
        <Slider {...settings}>
          {this.props.ReviewArray.map((Movie, index) => {
            return (
              <Link to={`/User/MovieReview?name=${Movie.MovieName}`}>
                <div className={classes.contentdiv} key={index} >
                  <img src={Movie.imgurl} alt="" />
                  <div className={classes.content}>

                    <div className={classes.wrapper}>
                      <div className="font-[900] lg:text-[5vw] md:text-[5.5vw] sm:text-[6vw] xs:text-[5.5vw] 2xs:text-[5.5vw] 2xs:mt-10 xs:mt-0
               lg:leading-[5rem] md:leading-[4rem] sm:leading-[3.2rem] xs:leading-[2.5rem] ">
                        {Movie.MovieName}
                      </div>


                      <div className={classes.movie_infos}>

                        <div className="flex items-center lg:text-[0.8rem] md:text-[0.7rem] xs:text-[0.65rem]  2xs:text-[0.6rem] font-[600]">
                          <AiFillStar color="gold" />
                          <span className="lg:text-[1.5rem] md:text-[1.2rem] xs:text-[1rem] 2xs:text-[0.7rem] ml-[5px]">
                          {Movie.rating}
                          </span>
                        </div>

                        <div className="flex items-center lg:text-[0.8rem] md:text-[0.7rem] xs:text-[0.65rem] 2xs:text-[0.6rem]   font-[600]">
                          <AiFillClockCircle color="red" className="ml-4" />
                          <span className="lg:text-[1.5rem] md:text-[1.2rem] xs:text-[1rem] 2xs:text-[0.7rem] ml-[5px]">
                            {Movie.duration}
                          </span>
                        </div>

                        <div className="flex items-center lg:text-[0.8rem] md:text-[0.7rem] xs:text-[0.65rem] 2xs:text-[0.6rem] font-[600]">
                          <BsFillProjectorFill color="green" size={20} className="ml-4" />
                          <span className="lg:text-[1.5rem] md:text-[1.2rem] xs:text-[1rem] 2xs:text-[0.7rem] ml-[5px]">HD</span>
                        </div>

                      </div>

                      <div className="lg:text-[1.15rem] md:text-[1.1rem] xs:text-[0.8rem] 2xs:text-[0.45rem] sm:leading-[1.5rem] xs:leading-[1.3rem] mt-2">
                        {Movie.reviewdesc}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

            )
          })}


        </Slider>
      </div>
    );
  }
}
