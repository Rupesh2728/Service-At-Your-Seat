import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
// import Dropdown from 'react-bootstrap/Dropdown';


export const EditMovie = ({show,handleClose}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='bg-[#212f1f] text-[gold]'>
           <Modal.Title>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-[lightgoldenrodyellow]'>
           <form className='font-semibold'> 

               <div className='flex flex-col'>
                <label className='text-[1.1rem] text-black'>Movie Title:</label>
                <select className='w-[75%] mt-[0.5rem] border-2 border-[black]'>      
                  <option value="No InActive Movies">No Active Movies</option>   
                  <option value="Salaar">Salaar</option>
                  <option value="BaadShah">BaadShah</option>
                </select>
               </div>
             

      
               <div className='flex flex-col mt-[2rem]'>
                <label className='text-[1.1rem] text-black'>Status</label>
                <select className='w-[75%] mt-[0.5rem] border-2 border-[black]'>
                  <option value="Active">Active</option>
                  <option value="InActive">InActive</option>          
                </select>
               </div>
              
               <button className='border-0 bg-[#4CAF50] text-white rounded-[4px] w-[5.5rem] h-[2.5rem] hover:bg-[#3e8e41] mt-[2rem]'>Save</button>
               
            </form>

        </Modal.Body>
        <Modal.Footer>
        <button className=' border-0 bg-[red] text-white rounded-[5px] w-[5.5rem] h-[2.5rem]' onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}