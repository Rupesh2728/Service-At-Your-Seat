import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TNavbar from "../TCommon/navbar.js";
import './theatredashboard.module.css';
import { Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import internalcss from './theatredashboard.module.css';
import URL from "../../../URL.js";


// import { useNavigate } from "react-router-dom";


function Theatredashboard() {

  const [modalShow, setModalShow] = React.useState(false);
  // const navigate=useNavigate();
  const [treviews,settreviews]=useState([]);


  const getDetails=async ()=>{


  const response=await fetch(URL+`/tdashboard`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:'include'
    });

  const res=await response.json();
  settreviews(res.treviewsarr);
  }

  useEffect(()=>{
    getDetails();
  },[]);

  return (
    <>

      <TNavbar />

      <Container className="mt-[2rem] flex justify-evenly">
        <Row className="w-[100%]">

          <Col lg={2}>

          </Col>

          <Col lg={3}>
            <div className="currentmovies"
              style={{
                backgroundColor: '#221f1f',
                color: 'white',
                borderRadius: '5px',
                width: '15rem',
                height: '8rem',
              }}
            >
              <h3 style={{ paddingLeft: '1rem', paddingTop: '0.5rem' }} className="text-[1.8rem]">Latest Movies screening</h3>        <h4 style={{ paddingLeft: '1rem', paddingTop: '0.5rem', color: 'gold' }} className="text-[1.7rem]">4</h4>
            </div>
          </Col>

          <Col lg={3}>
            <div style={{ backgroundColor: '#221f1f', color: 'white', borderRadius: '5px', width: '15rem', height: '8rem' }}>
              <h3 style={{ paddingLeft: '1rem', paddingTop: '0.5rem' }} className="text-[1.8rem]">Total Movies Screened</h3>
              <h4 style={{ paddingLeft: '1rem', paddingTop: '0.5rem', color: 'gold' }} className="text-[1.7rem]">10</h4>
            </div>
          </Col>

          <Col lg={3}>
            <div style={{ backgroundColor: '#221f1f', color: 'white', borderRadius: '5px', width: '15rem', height: '8rem' }}>
              <h3 style={{ paddingLeft: '1rem', paddingTop: '0.5rem' }} className="text-[1.8rem]">New Movies</h3>
              <h4 style={{ paddingLeft: '1rem', paddingTop: '0.5rem', color: 'gold' }} className="text-[1.7rem]">2</h4>
            </div>
          </Col>

          <Col lg={1}>
          </Col>
        </Row>
      </Container>




      <Container className="mt-[8rem] ">

        <div className={internalcss.reviewsandratings}>
          <h4 className="text-[1.4rem] ml-[13rem] " >Review and Rating</h4>
          {treviews.length === 0  && <p className='text-[gold] text-[2rem] mt-[1rem] ml-[13rem]'>No Theatre Reviews till date... </p>}

          <div className={`${internalcss.reviewtable} mt-[1rem] ml-[13rem] w-[75%]`}>
          {treviews.length!==0 &&
              <table>
              <thead>
                <tr className="headingrow">
                  <th>#</th>
                  <th>MailId</th>
                  <th>Name</th>
                  <th>Rating</th>
                  <th>Review</th>
                </tr>
              </thead>

              <tbody>
                {treviews.map((review,index) =>{
                   return (<tr key={index}>
                    <td>
                      {index+1}
                    </td>
                    <td>
                      {review.usermailid}
                    </td>
                    <td>
                      {review.username}
                    </td>
                    <td>
                      {review.rating}
                    </td>
                    <td style={{ display: "none" }}>
                      {review.reviewdesc}
                    </td>
                    <td>
      
                      <Button className="bg-blue-600" variant="primary" onClick={() => setModalShow(true)}>
                         See Full Review
                      </Button>
  
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        review={review}
                      />
                    </td>
                  </tr>)
                    
                   
 
                })}
                
              </tbody>
            </table>
            }
          </div>



        </div>
      </Container>







    </>
  )
}
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className=" bg-[#212f1f] b-0 text-yellow-400" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div class={internalcss.reviewbox}>
            <div class={internalcss.boxTop}>
              <div class={internalcss.profile}>
                <div class={internalcss.profileImg}>
                  <img src="https://indiaglitz-media.s3.amazonaws.com/telugu/home/rrr-review-250322-1.jpg"  alt=""/>
                </div>

                <div class={internalcss.nameUser}>
                  <strong>{props.review.username}</strong>
                  <span>{props.review.usermailid}</span>
                </div>
              </div>
              <div class={internalcss.ratingdiv}>

              </div>

            </div>

            <div class={internalcss.clientComment}>
              <p>{props.review.reviewdesc}</p>
            </div>
          </div>

      </Modal.Body>
      <Modal.Footer>
        <Button className="bg-blue-600" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default Theatredashboard;