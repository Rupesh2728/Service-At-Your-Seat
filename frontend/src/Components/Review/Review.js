import React, {useEffect, useState } from "react";
import styles from "./Reviews.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar as solidStar,faStar as regularStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { Link, useLocation } from "react-router-dom";
import URL from "../../URL";



const Review = () => {
  const maxStars = 5;

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const moviename = (params.get('name'));
 
  const [movieobjimgurl,setmovieobjimgurl]=useState({});
  const [reviewdataarr,setreviewdatarr]=useState([]);

  const [moviereview,setmoviereview]=useState("");
  const [mrating,setmrating]=useState("");

  const getDetails = async() =>{
    const response=await fetch(URL+`/reviews?name=${moviename}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:'include'
    });

  const res=await response.json();
  console.log(res);
  setmovieobjimgurl(res.movieobj.imgurl);
  setreviewdatarr(res.reviewdata);
  }
  
  useEffect(()=>{
     getDetails();
  },[])

  
  const OnSubmitHandler=async (e)=>{
          e.preventDefault();

    const response = await fetch(`http://localhost:5000/reviews?name=${moviename}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body:JSON.stringify({review:moviereview,rating:Number(mrating)}),
    });

    const k = await response.json();
    if(k.k===1)
    {
      getDetails();
    }

    setmrating("");
    setmoviereview("");
  }

  return (
    <>
      <div className={styles.body}>
        <section id="testimonials">
          <div className={styles.testimonialHeading}>
            <span>Reviews</span>
            <div className={styles.profileImg1}>
              <img src={movieobjimgurl} alt="" />
            </div>
          </div>
          <div className={styles.addcomment}>
            <form>
              <div className={styles.addcomment}>
                <label htmlFor="comment">Add your Review</label>
                <span className={styles.comment_box}>
                  {" "}
                  <input
                    type="text"
                    name="review"
                    style={{ backgroundColor: "#221f1f", color: "white" }}
                    onChange={(e)=>setmoviereview(e.target.value)}
                    value={moviereview}
                  />
                </span>
              </div>

              <div className={styles.addrating}>
                <label htmlFor="rating">Add your Rating</label>
                <select value={mrating} onChange={(e)=>setmrating(e.target.value)} className={styles.rating}>
                  <option className={styles.option} value="1">
                    1
                  </option>
                  <option className={styles.option} value="2">
                    2
                  </option>
                  <option className={styles.option} value="3">
                    3
                  </option>
                  <option className={styles.option} value="4">
                    4
                  </option>
                  <option className={styles.option} value="5">
                    5
                  </option>
                </select>
                <button
                  className={styles.postButton}
                  style={{
                    position: "relative",
                    right: "30%",
                    backgroundColor: "#221f1f",
                    color: "gold",
                    cursor: "pointer",
                  }}
                  type="submit"
                  onClick={OnSubmitHandler}
                >
                  Post
                </button>
              </div>
            </form>
          </div>

          <div className={styles.testimonialBoxContainer}>
            <div className={styles.testimonialBoxContainer}>
              {reviewdataarr.map((review, index) => (
                <div key={index} className={styles.testimonialBox}>
                  <div className={styles.boxTop} style={{display : 'flex', justifyContent:'space-between'}}>
                    <div className={styles.profile}>
                      <div className={styles.profileImg}>
                        <img src="https://cdn.wallpapersafari.com/46/60/uYOX0V.jpg" alt="User Profile" />
                      </div>
                      <div className={styles.nameUser}>
                        <strong>{review.criticname}</strong>
                      </div>
                    </div>
                    <div className={styles.reviews}>
                      {[...Array(Math.floor(review.rating))].map((_, j) => (
                        <FontAwesomeIcon key={j} icon={solidStar} />
                      ))}
                      {review.rating % 1 !== 0 && (
                        <FontAwesomeIcon icon={farStar} />
                      )}
                      {[...Array(maxStars - Math.ceil(review.rating))].map(
                        (_, j) => (
                          <FontAwesomeIcon key={j} icon={farStar} />
                        )
                      )}
                    </div>
                  </div>

                  <div className={styles.clientComment} style={{marginTop:'1.2rem'}}>
                    <p>{review.reviewdesc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
         
           <Link to="/User/MoviesPage"><button className={styles.backbtn}>Back</button></Link>
        </section>
      </div>
    </>
  );
};

export default Review;
