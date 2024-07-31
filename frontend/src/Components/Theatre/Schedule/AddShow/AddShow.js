import React, { useContext, useEffect, useState } from 'react';
import classes from './AddShow.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import { Row,Col} from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AddShow = ({show,handleClose,screens,addShowHandler,MoviesArray}) => {

  const { register, handleSubmit} = useForm();
   
  const[duration,setDuration]=useState("")
  const[selectmovie,setSelectmovie]=useState();

  function durationSettingHandler(e){     
    setDuration(MoviesArray.find((movie) => movie.MovieName === e.target.value).duration);
    setSelectmovie(e.target.value);
  }


  const onSubmit = (data) => {
    data.duration=duration;
    // console.log({...data,selectmovie:selectmovie});
    addShowHandler({...data,selectmovie:selectmovie});
    handleClose();


  };

  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header className='bg-[#212f1f] text-[gold]'>
         <Modal.Title>Add Show</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-[antiquewhite]'>
      <div className={classes.addshowform}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col className='flex flex-col'>
          <p className='mb-[0.25rem]'>Select screen</p>
          <select
            name="selectscreen"
            className='border-black border-2 rounded-[5px]'
            {...register('selectscreen')}
          >
            {screens.map((screeninfo, index) => (
              <option key={index} value={screeninfo.screenname}>
                {screeninfo.screenname}
              </option>
            ))}
          </select>
        </Col>

        <Col className='flex flex-col'>
          <p className='mb-[0.25rem]'>Movie</p>
          <select
            name="selectmovie"
            className='border-black border-2 rounded-[5px]'
            onChange={durationSettingHandler}
            // {...register('selectmovie')}
          >
              <option key={0} >
               Select Movie
              </option>
            {MoviesArray.map((Movie,index) => (
              <option key={index} value={Movie.MovieName}  >
                {Movie.MovieName}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      <Row className='mt-[2rem]'>
        <Col className='flex flex-col'>
          <p className='mb-[0.25rem]'>Duration</p>
          <input
            type="text"
            name="duration"
            className='border-black border-2 rounded-[5px]' 
            value={duration}
            {...register('duration')}
            required
          />
        </Col>

        <Col className='flex flex-col'>
          <p className='mb-[0.25rem]'>Show time</p>
          <div className='flex w-[30%]'>
            <input
              type="text"
              className='border-black border-2 rounded-[5px]'
              name="showtime"
              {...register('showtime')}
              required
            />
            <select
              name="ampm"
              className='ml-2 border-black border-2 rounded-[5px]'
              {...register('ampm')}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </Col>
      </Row>

      <Row className='mt-[2rem]'>
        <Col className='flex flex-col'>
          <p className='mb-[0.25rem]'>Premium Class Price</p>
          <input
            type="text"
            className='w-[50%] border-black border-2 rounded-[5px]'
            name="premiumclassprice"
            {...register('premiumclassprice')}
            required
          />
        </Col>

        <Col className='flex flex-col'>
          <p className='mb-[0.25rem]'>Normal Class Price</p>
          <input
            type="text"
            className='w-[50%] border-black border-2 rounded-[5px]'
            name="normalclassprice"
            {...register('normalclassprice')}
            required
          />
        </Col>
      </Row>

      <Row className='mt-[2rem]'>
        <Col className='flex flex-col'>
          <p className='mb-[0.25rem]'>From Date</p>
          <input
            type="date"
            className='w-[50%] border-black border-2 rounded-[5px]'
            name="fromdate"
            {...register('fromdate')}
            required
          />
        </Col>

        <Col className='flex flex-col'>
          <p className='mb-[0.25rem]'>To Date</p>
          <input
            type="date"
            className='w-[50%] border-black border-2 rounded-[5px]'
            name="todate"
            {...register('todate')}
            required
          />
        </Col>

        <Col className='flex flex-col'>
          <p className='mb-[0.25rem]'>Status</p>
          <select
            name="status"
            className='border-black border-2 rounded-[5px]'
            {...register('status')}
          >
            <option value="Active">Active</option>
            <option value="InActive">InActive</option>
          </select>
        </Col>
      </Row>

      <div className='flex justify-center mt-[3rem]'>
        <button
          type="submit"
          className='border-0 bg-[green] text-white rounded-[5px] w-[5.5rem] h-[2.5rem]'
        >
          Submit
        </button>
      </div>
    </form>
            </div>
    

      </Modal.Body>
      <Modal.Footer>
      <button className=' border-0 bg-[red] text-white rounded-[5px] w-[5.5rem] h-[2.5rem]' onClick={handleClose}>Close</button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddShow