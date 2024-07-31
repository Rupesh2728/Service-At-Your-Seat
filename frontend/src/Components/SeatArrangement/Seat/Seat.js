import React, { useState } from 'react'
import classes from './Seat.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWheelchair} from '@fortawesome/free-solid-svg-icons';

 {/* // 0-empty space
  // 1- Disabled
  // 2- Normal
  // 3- Premium-
  // 5- Selected
  // 4 -sold (default)  */}
const Seat = (props) => {
  
  const [click,setclick]=useState(props.type);

  const ClickHandler=()=>{
    const seatalphbet=String.fromCharCode(props.rownum+65);
    const num=(props.colnum+1).toString();
    const seatnum=seatalphbet+num;

    const price=props.type===3?props.infoobj.premiumprice:props.infoobj.normalprice;
    let seatnumsarr=[...props.selectedseatnums];
    let updatedseatarr=props.updatedseatarr;

    if(click===props.type)
      {
        setclick(5);
        props.setselectedseatcount(props.selectedseatcount+1);
        props.settotalseatsprice(props.totalseatsprice+Number(price));
        updatedseatarr[props.rownum][props.colnum]=4;
        seatnumsarr.push(seatnum);
        props.setselectedseatnums(seatnumsarr); 
      }
     else
     {
      setclick(props.type);
      props.setselectedseatcount(props.selectedseatcount-1);
      props.settotalseatsprice(props.totalseatsprice-Number(price));
      updatedseatarr[props.rownum][props.colnum]=props.type;
      let newarr = seatnumsarr.filter(item => item !== seatnum);
      props.setselectedseatnums(newarr); 
     }

     props.setupdatedseatarr(updatedseatarr);
      
  }
  
  return (<>
    {click===0 && <div className={classes.seats} style={{backgroundColor: "transparent",color: "transparent"}}>{props.children}</div>}
    {click===1 && <div onClick={ClickHandler} className={classes.seats} style={{backgroundColor: "#FFFDD0"}}> <FontAwesomeIcon icon={faWheelchair} className='w-[1.1rem] h-[1.1rem] pt-1 text-black' /> </div>}
    {click===2 && <div onClick={ClickHandler} className={classes.seats} style={{backgroundColor: "white"}}>{props.children}</div>}
    {click===3 && <div onClick={ClickHandler} className={classes.seats} style={{backgroundColor: "blue"}}>{props.children}</div>}
    {click===4 && <div className={classes.seats} style={{backgroundColor: "red"}}>{props.children}</div>}
    {click===5 && <div onClick={ClickHandler} className={classes.seats} style={{backgroundColor: "green"}}>{props.children}</div>}
    </>
  )
}

export default Seat