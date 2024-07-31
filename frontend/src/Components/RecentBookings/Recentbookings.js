import React, { useEffect, useState } from "react";
import classes from "./RecentBookings.module.css";
import Bookings from "./Bookings";
import NoRecentBookings from "./NoRecentBookings";
import { Link } from "react-router-dom";
import URL from "../../URL";



const Recentbookings = () => {

  const [tickets,settickets]=useState([]);

  const rendertickets=async ()=>{
    let res=await fetch(URL+`/recentbooking/`,{
      method:"GET",
      headers:{
          "Content-Type":"application/json"
          },
      credentials:'include'
    })
   
   let response=await res.json();
   settickets(response.ticketarr);
  }

  useEffect(()=>{
    rendertickets();
  },[]);

 
  
    return (
      <>
        <div className={classes.backHome}>
        <Link to="/User/HomePage">
          <button>Back to Home</button>{" "}
        </Link>
        </div>
        <Bookings tickets={tickets} />
      </>
    );
 
};

export default Recentbookings;
