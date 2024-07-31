import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import classes from "./RecentBookings.module.css";
import ticketbg from '../../Assests/RecentBooking/ticketbg.png'

const MyVerticallyCenteredModal = (props) => {
  
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2 className={classes.logo}>
              {/* <i class="bx bxl-firebase"></i>       */}
              SAYS
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="h-[35rem] text-center">
          <Container>
            <Row>
              <Col>
                <div className="text-center">
                  <img className={classes.posterimg} src={props.ticket.Movieimgurl}/>  
                </div>
              </Col>
            </Row>
           
              <div className={classes.card}>
                <div><img src={ticketbg} className=" absolute top-[20rem] left-[3rem] w-[25rem]"/></div>
                <div className={classes.content}>
                  <span className="font-[500px] text-[13px] text-[#9D9EA3] mt-0">
                    Movie
                  </span>
                  <p className="mname">{props.ticket.MovieName}</p>

                  <div className=" flex justify-between">
                    <div style={{ display: "block" }}>
                      <span
                        style={{
                          fontWeight: "500px",
                          fontSize: "13px",
                          color: "#9D9EA3",
                        }}>
                        Theatre
                      </span>
                      <p>{props.ticket.theatrename}</p>
                    </div>

                    <div style={{ display: "block" }}>
                      <span
                        style={{
                          fontWeight: "500px",
                          fontSize: "13px",
                          color: "#9D9EA3",
                        }}>
                        Screen
                      </span>
                      <p>{props.ticket.screenname}</p>
                    </div>
                  </div>
                  <div className={classes.seat_time}>
                    <div className={classes.span2}>
                      <span>Seat</span>
                      <span>TIME</span>
                    </div>
                    <div className={classes.span1}>
                      <span className="text-[0.95rem]">{props.ticket.seats.map((seat,index)=>{return (index!=props.ticket.seats.length-1?(seat+","):(seat))})}</span>
                      <span className="text-[0.95rem]">{props.ticket.time}</span>
                    </div>
                  </div>
                </div>
              </div>
          
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {/* <button onClick={props.onHide} className="p-2 bg-[#0d6efd] text-[white] w-[6rem] rounded-[0.5rem] font-light text-[0.95rem] hover:bg-[indianred]">Close</button> */}
      </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyVerticallyCenteredModal;
