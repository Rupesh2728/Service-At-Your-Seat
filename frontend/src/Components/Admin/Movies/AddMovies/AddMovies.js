import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
// import Dropdown from 'react-bootstrap/Dropdown';
import classes from './Addmovies.module.css';

const AddMovies = ({onSubmit,show,handleClose}) => {

  const { register, handleSubmit, formState: { errors } } = useForm();
 
 


 



  return (
      <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header className='bg-[#221f1f] text-[gold]'>
           <Modal.Title>Movie Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-[lightgoldenrodyellow] h-[30rem] overflow-y-auto'>
        <div className={classes.maindiv}>
          {/* starts here */}
           <form onSubmit={handleSubmit(onSubmit)} className={classes.form} method="post">
           <div className={classes.div1}>
              <div className={classes.subdiv1}>
                <label for="theatreName" className={classes.label}>Movie Name:</label>
                <input type="text" name="mName"  {...register("MovieName",{})} className={classes.input}/><br/>
           </div>
      
          <div className={classes.subdiv2}>
             <label for="imgurl" className={classes.label}>Movie Image URL:</label>
             <input type="text" name="theatreimgurl" {...register("MovieImageURL",{})} className={classes.input}/><br/>
          </div>

          <div className={classes.subdiv3}>
            <label for="langinfo" className={classes.label}>Language:</label>
            <select name="lang" {...register("Language",{})} class="lang">
                <option value="Telugu" className={classes.option}>Telugu</option>
                <option value="Hindi" className={classes.option}>Hindi</option>
                <option value="Tamil" className={classes.option}>Tamil</option>
                <option value="Malayalam" className={classes.option}>Malayalam</option>
                <option value="Kannada" className={classes.option}>Kannada</option>
                <option value="English" className={classes.option}>English</option>
            </select>
          </div>
      </div>
      
      <div class="div2">
          <div className={classes.subdiv1}>
              <label for="imgurl" className={classes.label}>Release Date:</label>
              <input type="text" className={classes.input} name="rd" {...register("ReleaseDate",{})} placeholder="e.g.25th June,2021" required/><br/>
          </div>
          
           <div className={classes.subdiv2}>
              <label for="imgurl" className={classes.label}>Duration:</label>
             <input type="text" className={classes.input} name="duration" {...register("Duration",{})} required/><br/>	
           </div>

           <div className={classes.subdiv3}>
            <label for="screentype" className={classes.label}>Genre:</label>
            <input type="text" className={classes.input} name="genre" {...register("Genre",{})} required/><br/>
           </div>
       </div>

       <div className={classes.div10}>
        <div className={classes.subdiv1}>
            <label for="Locations" className={classes.label}>Locations:</label>
            <input type="text"  name="locs" {...register("Locations",{})} className={classes.locinput} placeholder="e.g.Vijayawada,Guntur,Nellore,...." required/><br/>
        </div>
     </div>
  
      <div className={classes.div3}>
          <div className={classes.subdiv1}>
            <label for="castinfo" className={classes.label}>Cast name-1:</label>
            <input type="text"  className={classes.input} name="cn1" {...register("CastName1",{})} required/><br/>
           </div>
  
           <div className={classes.subdiv2}>
            <label for="castinfo" className={classes.label} >Cast Image URL1:</label>
            <input type="text"  name="cimg1" className={classes.input} {...register("CastImageURL1",{})} required/><br/>
           </div>
        </div>   

        <div className={classes.div4}>
           <div className={classes.subdiv1}>
              <label for="castinfo" className={classes.label}>Cast name-2:</label>
              <input type="text" name="cn2" className={classes.input} {...register("CastName2",{})} required/><br/>
           </div>
  
            <div className={classes.subdiv2}>
              <label for="castinfo" className={classes.label}>Cast Image URL2:</label>
              <input type="text" name="cimg2" className={classes.input} {...register("CastImageURL2",{})} required/><br/>
           </div>
        </div>   

        <div className={classes.div5}>
          <div className={classes.subdiv1}>
            <label for="castinfo" className={classes.label}>Cast name-3:</label>
            <input type="text" name="cn3" className={classes.input} {...register("CastName3",{})} required/><br/>
          </div>
  
           <div className={classes.subdiv2}>
            <label for="castinfo" className={classes.label}>Cast Image URL3:</label>
            <input type="text" name="cimg3" className={classes.input} {...register("CastImageURL3",{})} required/><br/>
           </div>
        </div>   

        <div className={classes.div6}>
          <div className={classes.subdiv1}>
            <label for="castinfo" className={classes.label}>Cast name-4:</label>
            <input type="text" name="cn4" className={classes.input} {...register("CastName4",{})} required/><br/>
           </div>
  
           <div className={classes.subdiv2}>
            <label for="castinfo" className={classes.label}>Cast Image URL4:</label>
            <input type="text" name="cimg4" className={classes.input} {...register("CastImageURL4",{})} required/><br/>
           </div>
        </div>   

        <div className={classes.div7}>
          <div className={classes.subdiv1}>
            <label for="screentype" className={classes.label}>Cast name-5:</label>
            <input type="text" name="cn5" className={classes.input} {...register("CastName5",{})} required/><br/>
           </div>
  
           <div className={classes.subdiv2}>
            <label for="castinfo" className={classes.label}>Cast Image URL5:</label>
            <input type="text" name="cimg5" className={classes.input} {...register("CastImageURL5",{})} required/><br/>
           </div>
        </div>   
  
          
         <div className={classes.div8} style={{display:"block"}}>
          <label for="about" className={classes.label}>About:</label>
          <textarea name="about" rows="5" cols="100" {...register("About",{})} required></textarea>
          <br/>
         </div>
  
       <div className={classes.div9} style={{display: 'flex', justifyContent:'center'}}>
          <button type="submit" className={classes.button}>Submit</button>
       </div>
    </form>
  

   {/* end here */}
      </div>
               
        </Modal.Body>
        <Modal.Footer>
        <button className=' border-0 bg-[red] text-white rounded-[5px] w-[5.5rem] h-[2.5rem]' onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddMovies