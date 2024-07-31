import React, {useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Snacks.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faIndianRupeeSign,faStar,faPlusCircle} from '@fortawesome/free-solid-svg-icons';


const Card = ({fooditem,addtocart}) => {
    const [styleobj,setstyleobj]=useState({color: "white"});
    return (
    <div className={classes.item_card}>
    <img src={fooditem.imgurl} alt=''/>
    <div className={classes.foodinfo}>
      <p className={classes.item_name}>
         {fooditem.SnackName}
      </p>
      <p className={classes.item_price}>
      <FontAwesomeIcon icon={faIndianRupeeSign} style={{color: "#ffd700",}}  />
        <span>
         {fooditem.price}
        </span>
      </p>
    </div>

    <div className={classes.card_top}>
    <div>
    <FontAwesomeIcon icon={faStar} style={{color: "#ffd700",}} />
    <span className='text-white'>
      4.5
    </span>
    </div>
      <FontAwesomeIcon onClick={()=>{addtocart(fooditem); setstyleobj({color: "green"})}} icon={faPlusCircle} style={styleobj} className='w-[1.2rem] h-[1.2rem]' />
    </div>
 </div>
  )
}

export default Card