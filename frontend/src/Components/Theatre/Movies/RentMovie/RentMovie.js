import React, { useEffect, useState } from 'react';
import classes from './RentMovie.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
// import Dropdown from 'react-bootstrap/Dropdown';

import { useForm } from 'react-hook-form';


export const RentMovie = ({ rentMovieHandler, rentedMovies, show, handleClose,tobj }) => {

  console.log(rentedMovies);
  const { register, handleSubmit } = useForm();
  

  const onSubmit = (data) => {

    rentMovieHandler(data);

  };



  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='bg-[#212f1f] text-[gold]'>
          <Modal.Title>Rental Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-[lightgoldenrodyellow]'>
          <form className='font-semibold' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="movie_title" className='text-black'>Movie Title:</label>
            <input {...register('MovieName')} className={classes.text} type='text' value={rentedMovies.MovieName} required readOnly />

            <label htmlFor="customer_name" className='text-black'>Theatre Name:</label>
            <input {...register('tname')} className={classes.text} type='text' value={tobj.tName} required readOnly />

            <label htmlFor="customer_email" className='text-black'>Theatre Mail:</label>
            <input {...register('temail')} className={classes.email} type='email' value={tobj.temail} required readOnly />

            <label htmlFor="rental_days" className='text-black'>Rental Days:</label>
            <input {...register('rentaldays')} className={classes.number} type='number' min="1" max="30" required />

            <label htmlFor="rental_date" className='text-black'>Rental Date:</label>
            <input {...register('rentaldate')} className={classes.date} type='date'  required />

            <button className='border-0 bg-[#4CAF50] text-white rounded-[4px] w-[5.5rem] h-[2.5rem] hover:bg-[#3e8e41]' type="submit">Rent</button>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <button className=' border-0 bg-[red] text-white rounded-[5px] w-[5.5rem] h-[2.5rem]' onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}