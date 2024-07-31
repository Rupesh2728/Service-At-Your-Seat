import React from 'react';
import classes from './Arrangement.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Seat from '../Seat/Seat';

const Arrangement = ({seatarr,setseatarr,pc,dc,es}) => {
  
   const seatarrchangeHandler=(rowindex,colindex,type)=>{
       const newseatarr=seatarr;
       newseatarr[rowindex][colindex]=type;
       setseatarr(newseatarr);
   }
  
   return (
    <div className=''>
       {seatarr.map((row,rowIndex)=>{
          return (
          <div key={rowIndex} className='flex mt-[1.5rem]'>

            <div className={classes.alphabet}>
               {String.fromCharCode(rowIndex + 65)}
            </div>

            <div className='m-auto'>

            <div className='flex'>
              
              {
                 row.map((col,colIndex)=>{
                       return (
                         <Seat key={colIndex} colnum={colIndex} rownum={rowIndex} type={col} pc={pc} dc={dc} es={es} seatarrchangeHandler={seatarrchangeHandler}/>
                      )
                 })
              }
             </div>

            </div>


          </div>)
            
       })}



    </div>
  )
}

export default Arrangement