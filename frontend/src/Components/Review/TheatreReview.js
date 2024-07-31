import React, { useEffect, useState } from 'react';
import styles from "./Reviews.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar as solidStar,faStar as regularStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useLocation} from 'react-router-dom';
import URL from '../../URL';



const TheatreReview = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const treff = (params.get('treff'));
    const [tname,settname]=useState("");
    const [reviews,setreviews]=useState([]);

    const [treview,settreview] = useState("");
    const [rating,setrating] = useState("");


    const LoadDetails=async (treff)=>{
        const response=await fetch(URL+`/treviews?treff=${treff}`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            },
            credentials:'include'
          });
    
        const res=await response.json();
        console.log(res);
        setreviews(res.reviewdata);
        settname(res.tname);
       }
        
        useEffect(()=>{
            const treff = (params.get('treff'));
            LoadDetails(treff); 
        },[treff])
      const maxStars = 5;


      const postreview = async (treview,rating) =>{
        const response = await fetch(URL+`/treviews?treff=${treff}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', 
            body:JSON.stringify({review:treview,rating:Number(rating)}),
          });
      
          const k = await response.json();
          if(k.k===1)
          {
            LoadDetails(treff);
          }
      }


      const onSubmitHandler=(e)=>{
          e.preventDefault();
          postreview(treview,rating);
          setrating("");
          settreview("");
      }
      
      return (
        <>
          <div className={styles.body} style={{fontFamily:'poppins'}}>
            <section id="testimonials">
              <div className={styles.testimonialHeading}>
               <div className='flex'>
                  <p className='text-[white] font-extrabold text-[3rem]'>{tname}</p>
                  <span className='mt-[2rem] ml-[0.5rem] font-extrabold'>Reviews</span>
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
                        value={treview}
                        onChange={(e)=>settreview(e.target.value)}
                        style={{ backgroundColor: "#221f1f", color: "white" }}
                      />
                    </span>
                  </div>
    
                  <div className={styles.addrating}>
                    <label htmlFor="rating">Add your Rating</label>
                    <select id="rating" value={rating} className={styles.rating} style={{borderColor:'white'}} name="rating" onChange={(e)=>{setrating(e.target.value)}}>
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
                      className="w-[6rem] h-[2.5rem] bg-[#221f1f] text-[gold] ml-[5rem] text-[1.1rem] rounded-[0.5rem]"
                    //   style={{
                    //     position: "relative",
                    //     right: "30%",
                    //     backgroundColor: "#221f1f",
                    //     color: "gold",
                    //     cursor: "pointer",
                    //   }}
                      type="button"
                      onClick={onSubmitHandler}
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
    
              <div className={styles.testimonialBoxContainer}>
                <div className={styles.testimonialBoxContainer}>
                  {reviews.map((review, index) => (
                    <div key={index} className={styles.testimonialBox}>
                      <div className={styles.boxTop} style={{display:'flex', justifyContent:'space-between'}}>
                        <div className={styles.profile}>
                          <div className={styles.profileImg}>
                            <img src="https://cdn.wallpapersafari.com/46/60/uYOX0V.jpg" alt="User Profile" />
                          </div>
                          <div className={styles.nameUser}>
                            <strong>{review.review[0].username}</strong>
                            <span>{review.review[0].usermailid}</span>
                          </div>
                        </div>
                        <div className={styles.reviews}>
                          {/* {[...Array(review.rating)].map((_, i) => (
                              <FontAwesomeIcon key={i} icon={solidStar} />
                            ))}
                            {[...Array(5 - review.rating)].map((_, i) => (
                              <FontAwesomeIcon key={i} icon={farStar} />
                            ))} */}
                          {[...Array(Math.floor(review.review[0].rating))].map((_, j) => (
                            <FontAwesomeIcon key={j} icon={solidStar} />
                          ))}
                          {review.review[0].rating % 1 !== 0 && (
                            <FontAwesomeIcon icon={farStar} />
                          )}
                          {[...Array(maxStars - Math.ceil(review.review[0].rating))].map(
                            (_, j) => (
                              <FontAwesomeIcon key={j} icon={farStar} />
                            )
                          )}
                        </div>
                      </div>
    
                      <div className={styles.clientComment} style={{marginTop:'1rem'}}>
                        <p>{review.review[0].reviewdesc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
    
             
               <Link to="/User/HomePage"><button className={styles.backbtn}>Back</button></Link>
              
            </section>
          </div>
        </>
      );
}

export default TheatreReview