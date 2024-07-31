import React, { useEffect, useState } from 'react';
import classes from './Seat.module.css';

const Seat = ({type,pc,dc,es,colnum,rownum,seatarrchangeHandler}) => {
   
 
   
  const [classobj,setClassobj]=useState("");
 
  useEffect(()=>{
    switch (type) {
      case 0:
        setClassobj(classes.es);
        break;
      case 1:
          setClassobj(classes.dc);
        break;
      case 2:
          setClassobj(classes.nc);
        break;
      case 3:
          setClassobj(classes.pc);
        break;
      case 4 :   
          setClassobj(classes.selected);  
        break;
      default: 
        setClassobj(classes.sold);  
    }
  },[type])
  


  const onClickHandler=()=>{
      if(pc && !dc && !es)
      {
       
        setClassobj(classes.pc);
        seatarrchangeHandler(rownum,colnum,3);
      }

      else if(!pc && dc && !es)
      {
        
        setClassobj(classes.dc);
        seatarrchangeHandler(rownum,colnum,1);
      }

      else if(!pc && !dc && es)
      {
        setClassobj(classes.es);
        seatarrchangeHandler(rownum,colnum,0);
      }

      else if(!pc && !dc && !es)
       {
        setClassobj(classes.nc);
        seatarrchangeHandler(rownum,colnum,type);
       }
      
  }
  
  
    return (
    <div className={classobj} onClick={onClickHandler}></div>
    )
}

export default Seat