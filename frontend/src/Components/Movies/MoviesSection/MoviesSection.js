import React, { useState, useContext, useEffect } from 'react';
import MultiItemCarousel from "../../Common/MultiItemCarousel/MultiItemCarousal";
import SectionTitle from "../SectionTitle/SectionTitle";
import MovieCard from "./MovieCard/MovieCard";
import classes from './MoviesSection.module.css';
import ReviewSection   from '../ReviewHub/ReviewSection'





const MoviesSection=(props)=>{
 
  const [movieitemarr,setMovieitemarr]=useState([]);
   
  


 useEffect(()=>{
  const x= props.MoviesArray.map((Movie,index)=>{
    return < MovieCard MovieDetails={Movie} location={props.location} title={props.title} key={index}/>
   })
   setMovieitemarr([...x]);
 }, [props.MoviesArray])
   
               
     return (
      <>
    <section className={classes.moviessection} style={props.style}>

         <SectionTitle title={props.title}/>
          
      <MultiItemCarousel  itemarr={movieitemarr}/>  
    </section>
     
    {props.title==="Latest Movies"?<></>:<ReviewSection ReviewArray={props.ReviewArray} />}   

     </>
 
)
}

export default MoviesSection;
