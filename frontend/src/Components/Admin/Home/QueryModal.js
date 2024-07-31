import React from 'react';
import classes from './Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const QueryModal = ({show,handleClose,msg}) => {
  return (
    <Modal show={show} onHide={handleClose} animation={false} 
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header className='bg-[#221f1f] text-[gold]'>
          <Modal.Title>#Query</Modal.Title>
        </Modal.Header>

        <Modal.Body className='bg-[antiquewhite]'>
        <div className={classes.reviewbox}>
          <div className={classes.box_top}>   
              <div className={classes.profile}>
                  <div className={classes.profile_img}>
                      <img src="https://cdn.siasat.com/wp-content/uploads/2022/08/jr-ntr-health.jpg" alt='' />
                  </div>

                    <div className={classes.name_user}>
                      <strong>{msg.name}</strong>
                      <span>{msg.mail}</span>
                    </div>
              </div>

          </div>

          <div className={classes.client_comment}>
              <p>{msg.msg}</p>
          </div>
      </div>
        </Modal.Body>
        <Modal.Footer>
        <button className=' border-0 bg-[red] text-white rounded-[5px] w-[5.5rem] h-[2.5rem]' onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
  )
}

export default QueryModal