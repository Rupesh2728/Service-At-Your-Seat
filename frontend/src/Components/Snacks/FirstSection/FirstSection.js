import React from 'react'
import classes from './FirstSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping } from '@fortawesome/free-solid-svg-icons';

const FirstSection = () => {
  return (
  
    <div className={classes.header}>
            <div className={classes.add_box}>
              <form method="post" id="ticketidform">
                <label>Ticket Id :</label>
                <select name="Ticketid"  className={classes.ticketid} onclick="submitForms()">   
                    <option value="SAYS1001" onclick="submitForms()" class="dropdownForTickets">
                      SAYS1001
                    </option> 

                    <option value="SAYS1002" onclick="submitForms()" class="dropdownForTickets">
                      SAYS1002
                    </option> 

                    <option value="SAYS1003" onclick="submitForms()" class="dropdownForTickets">
                      SAYS1003
                    </option> 
                </select>
              </form>
            </div>

        
            <button type="button" class="util" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='bg-[#221f1f] p-2 mr-[3rem]'>
            <FontAwesomeIcon icon={faCartShopping} style={{color:"#ffd700",}}/>
              <span className='text-white px-1 ml-2'>0 Items</span>
            </button>

      </div>
  )
}

export default FirstSection