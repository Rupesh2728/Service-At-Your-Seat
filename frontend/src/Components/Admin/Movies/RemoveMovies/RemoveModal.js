import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';



export const RemoveModal = ({show,handleClose,MoviesArray,RemoveHandler,setremovemovie,removemovie}) => {
   const selectedvalue=(e)=>
    {
       setremovemovie(e);
    }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='bg-[#221f1f] text-[gold]'>
           <Modal.Title>Remove Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-[lightgoldenrodyellow]'>
        <form  className="w-[80%] flex justify-center">  
         <div className='flex flex-col'>
          <label for="movie_title" className='text-[1.2rem] text-[#221f1f]'>Movie Title:</label>
          <Dropdown className='border-none ml-2' onSelect={selectedvalue}>
             <Dropdown.Toggle className='text-black bg-white border-none' variant='none'>
                {removemovie}
             </Dropdown.Toggle>

            <Dropdown.Menu className=' overflow-auto max-h-[15rem]'>
            {MoviesArray.length===0 && <Dropdown.Item eventKey="No Movies">No Movies</Dropdown.Item>}
              
              {MoviesArray.map(movie=>{
                return <Dropdown.Item eventKey={movie.MovieName}>{movie.MovieName}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>

          {MoviesArray.length!==0 && <button onClick={RemoveHandler} type="submit" className='mt-[2rem] border-none bg-[green] text-white w-[6rem] rounded-[5px] p-2 ml-[12rem]'>Confirm</button>}
          {MoviesArray.length===0 && <button type="submit" className='mt-[2rem] border-none bg-[indianred] text-white w-[6rem] rounded-[5px] p-2 ml-[12rem]' disabled>Confirm</button>}
         </div>
      </form>

        </Modal.Body>
        <Modal.Footer>
        <button className=' border-0 bg-[red] text-white rounded-[5px] w-[5.5rem] h-[2.5rem]' onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
