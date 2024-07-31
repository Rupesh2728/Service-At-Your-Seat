import React, { useState } from 'react';
import classes from './AddScreen.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import SeatArrangement from './SeatArrangement/SeatArrangement';
import { useForm } from 'react-hook-form';
const AddScreen = ({ show, handleClose,addScreenHandler}) => {

  const { register, handleSubmit, formState: { errors } } = useForm();


  const [show1, setShow1] = useState(false);
  const handleClose1 = () => { setShow1(false) };
  const handleShow1 = () => {
    setShow1(true);
  };
   

  const [seatMatrix,setSeatMatrix]=useState(null);
  const onSubmit = (data) => {
    
    handleShow1();
    console.log(data);
    setSeatMatrix({
      data:data,
      row:data.numrows,
      col:data.numcolumns
    })
    

  
  };

  return (
    <div>
      {show1 && <SeatArrangement show={show1} handleClose1={handleClose1} handleClose2={handleClose} seatMatrix={seatMatrix} addScreenHandler={addScreenHandler}/>}

      {!show1 &&
        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header className='bg-[#212f1f] text-[gold]'>
            <Modal.Title>Add Screen</Modal.Title>
          </Modal.Header>
          <Modal.Body className='bg-white'>
            <div className={classes.addscreenform}>
              <form className='font-semibold' onSubmit={handleSubmit(onSubmit)}>
                <Row className='pt-[1rem]'>
                  <Col className='flex flex-col pl-[2rem]'>
                    <p>Screen Name</p>
                    <input
                      type="text"
                      className='rounded-md border-black border-2 h-[2.2rem] mt-[0.5rem]'
                      {...register('screenname', { required: 'Screen Name is required' })}
                    />
                    {errors.screenname && <p>{errors.screenname.message}</p>}
                  </Col>

                  <Col className='flex flex-col pr-[2rem]'>
                    <p>Screen Capacity</p>
                    <input
                      type="text"
                      className='rounded-md border-black border-2 h-[2.2rem] mt-[0.5rem]'
                      {...register('screencapacity', { required: 'Screen Capacity is required' })}
                    />
                    {errors.screencapacity && <p>{errors.screencapacity.message}</p>}
                  </Col>
                </Row>

                <Row className='mt-[2rem]'>
                  <Col className='flex flex-col pl-[2rem]'>
                    <p>No. of Rows</p>
                    <input
                      type="text"
                      className='rounded-md border-black border-2 h-[2.2rem] mt-[0.5rem]'
                      {...register('numrows', { required: 'No. of Rows is required' })}
                    />
                    {errors.numrows && <p>{errors.numrows.message}</p>}
                  </Col>

                  <Col className='flex flex-col pr-[2rem]'>
                    <p>No. of columns</p>
                    <input
                      type="text"
                      className='rounded-md border-black border-2 h-[2.2rem] mt-[0.5rem]'
                      {...register('numcolumns', { required: 'No. of Columns is required' })}
                    />
                    {errors.numcolumns && <p>{errors.numcolumns.message}</p>}
                  </Col>
                </Row>

                <div className='flex justify-center py-[1rem]'>
                  <button
                    type="submit"
                    className='bg-[green] w-[7rem] h-[2.5rem] mr-[2rem] mt-[1rem] rounded-md text-[white] hover:bg-[indianred]'
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <button className=' border-0 bg-[red] text-white rounded-[5px] w-[5.5rem] h-[2.5rem]' onClick={handleClose}>Close</button>
          </Modal.Footer>
        </Modal>}


    </div>
  )
}

export default AddScreen