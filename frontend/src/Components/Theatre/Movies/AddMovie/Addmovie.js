import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
// import Dropdown from 'react-bootstrap/Dropdown';


export const AddMovie = ({ AddedMovieHandler,AddMovieArray, show, handleClose }) => {

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // console.log(data); 
    AddedMovieHandler(data);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='bg-[#212f1f] text-[gold]'>
          <Modal.Title>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-[lightgoldenrodyellow]'>
          <form className='font-semibold' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col'>
              <label className='text-[1.1rem] text-black'>Movie Title:</label>
              <select
                {...register('MovieName')}
                className='w-[75%] mt-[0.5rem] border-2 border-[black]'
              >

                {AddMovieArray.length === 0 && <p>No movies</p>}
                {AddMovieArray.length !== 0 && AddMovieArray.map((Movie, index) => (
                  <option key={index} value={Movie.MovieName}>
                    {Movie.MovieName}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col mt-[2rem]'>
              <label className='text-[1.1rem] text-black'>Status</label>
              <select
                {...register('status')}
                className='w-[75%] mt-[0.5rem] border-2 border-[black]'
              >
                <option value='Active'>Active</option>
                <option value='InActive'>InActive</option>
              </select>
            </div>

            <button
              type='submit'
              className='border-0 bg-[#4CAF50] text-white rounded-[4px] w-[5.5rem] h-[2.5rem] hover:bg-[#3e8e41] mt-[2rem]'
            >
              Save
            </button>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <button className=' border-0 bg-[red] text-white rounded-[5px] w-[5.5rem] h-[2.5rem]' onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}