import React, { useEffect, useState } from "react";
import classes from "./Timings.module.css";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import URL from "../../URL";




const Timings = (props) => {
  const { movieName } = props

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const MovieArray = JSON.parse(params.get('MovieDetails'));
  const city = params.get('city');

  const navigate = useNavigate();

  const [showDetails, setshowDetails] = useState([]);
  const [showTime, setshowTime] = useState("Show All");
  async function renderTimings() {
    let response = await fetch(URL+`/movies/timings?name=${(MovieArray.MovieName)}&city=${city}`, {

      method: "GET",
      headers: {
        "Content-Type": "application/json"

      },
      credentials: 'include'


    });
    let x = await response.json();
    console.log(x);
    setshowDetails(x.showdetailsarray);
  }

  useEffect(() => {

    renderTimings();

  }, [])

  function navigateToSeatArragement(time, treff) {
    navigate(`/User/SeatArrangementPage?MovieArray=${JSON.stringify(MovieArray)}&time=${time}&tReff=${treff}`);

  }

  return (
    <div className={classes.body}>
      <div id={classes.timevalue}>
        <p> timevalue</p>
      </div>
      <div className={classes.blurpart}></div>
      <div className={classes.container}>
        <div className={classes.box1}>
          <img
            src={MovieArray.imgurl}
            alt=""
          />
        </div>
        <div className={classes.box2}>

          <div className={classes.filters}>
            <h2 className={classes.movieName} >{movieName}</h2>
            <div className={classes.time_filter}>
              <label htmlFor="time">Select Time</label>
              <form method="post" id="time_filter">
                <select name="time" id="time" onChange={(e) => {
                  setshowTime(e.target.value);
                }}>
                  <option value="Show All" >
                    Show All
                  </option>
                  <option value="12:00 AM" >
                    12:00 AM
                  </option>
                  <option value="6:00 AM" >
                    6:00 AM
                  </option>
                  <option value="9:00 AM" >
                    9:00 AM
                  </option>
                  <option value="2:00 PM" >
                    2:00 PM
                  </option>
                  <option value="6:00 PM" >
                    6:00 PM
                  </option>
                  <option value="9:00 PM" >
                    9:00 PM
                  </option>
                  <option value="12:00 PM" >
                    12:00 PM
                  </option>
                </select>
              </form>
            </div>
          </div>
          {showDetails.map((showDetail, iterationNumber) => {

            if (showTime === "Show All" || showDetail.timingsarray.includes(showTime)) {
              return (
                <div className={classes.theatre} key={iterationNumber}>
                  <div className={classes.sub_theatre}>
                    <h2 className="flex text-[1.2rem] mb-[1rem]">{showDetail.tName}  <IoInformationCircleOutline className="text-[white] ml-[1.2rem]" /> </h2>

                    {showDetail.timingsarray.map((tArray, index) => {
                      if (showTime === "Show All" || showTime === tArray) {
                        return (

                          <span key={index}>

                            <button onClick={() => { navigateToSeatArragement(tArray, showDetail.tReff) }}>{tArray}</button>

                          </span>

                        );
                      }

                    })}
                  </div>
                </div>
              );
            }
          })}

        </div>
      </div>
    </div>
  );
};

export default Timings;
