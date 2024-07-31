import React, { useState } from "react";
import classes from "./RecentBookings.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import  MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import { Link } from "react-router-dom";
const Bookings = (props) => {
  const { tickets } = props;
  const [modalShow, setModalShow] = React.useState(false);
  const [ticket,setticket]=useState({});

  return (
    <>
     {modalShow && <MyVerticallyCenteredModal ticket={ticket} show={modalShow} onHide={() => setModalShow(false) }/>}
      <div className={classes.backHome}>
        <Link to="/User/HomePage">
          <button>Back to Home</button>
        </Link>
      </div>
      <div className={classes.background}></div>
      <div className={classes.container_own}>
          <h2 className={classes.heading}>Recent Bookings</h2>
          <table className={classes.table}>
            <thead>
              <tr>
                <th className={classes.th}>Ticket ID</th>
                <th className={classes.th}>Movie Name</th>
                <th className={classes.th}>Location</th>
                <th className={classes.th}>Your Ticket</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => {
                return (
                  <tr key={ticket.ticketId}>
                    <td className={classes.td}>{ticket.TicketId}</td>
                    <td className={classes.td}>{ticket.MovieName}</td>
                    <td className={classes.td}>{ticket.location}</td>
                    <td className={classes.td}>
                      <button className="p-2 bg-[#0d6efd] rounded-[0.5rem] font-light text-[0.95rem] hover:bg-[green]"
                        onClick={() => {setModalShow(true); setticket(ticket)}}>
                        Show Ticket
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>  
    </>
  );
};

export default Bookings;
