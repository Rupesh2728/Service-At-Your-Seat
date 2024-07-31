import React from 'react';
import classes from './Theatre.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNav from '../../Common/Admin/Navbar/AdminNav';
import {Container} from 'react-bootstrap';
import { useState,useEffect } from 'react';
import URL from '../../../URL';




const Theatre = () => {
  
  const [theatres,settheatres]=useState([]);

  const get_theatres_func=async ()=>{
    let response = await fetch(URL+"/Admintheatre", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials:'include'
    });
    const res = await response.json();
    settheatres(res.theatres);
   }

    useEffect(()=>{
      get_theatres_func();
    },[]);


    const RemoveHandler=async (tid)=>{
    
    let response = await fetch(URL+"/Admintheatre/removetheatre", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({tid : tid}),
      credentials: 'include'
    });
    const res = await response.json();
    
     if(res.k===1)
     {
         get_theatres_func();
     }
     else
      {
        console.log("Unable to remove Theatre");
      }
  }
  return (
    <>
     <AdminNav signout={false}/>
     <div className='mt-[3rem]'>
        <div className={classes.heading}>
            <h4>THEATRES</h4>
        </div>
          {theatres.length===0 && <p className='text-[gold] text-[2rem] items-center text-center mt-[2rem]'>No Theatres Registered for the Website...Till Date</p>   }    
           {theatres.length!==0 && 
           <Container className='mt-[2rem] ml-[9rem] w-[90%]'>
            <div className={classes.theatretable}>  
                    <table className={classes.table}>
                          <thead>
                            <tr className={classes.headingrow}>
                              <th>Theatre ReffNo.</th>
                              <th>Theatre Mail</th>
                              <th>Theatre Name</th>
                              <th>Location</th>
                            </tr>
                          </thead>
                          
                          <tbody>
                         
                            {theatres.map((theatre)=>{
                               return(<>
                                 <tr>
                                   <td className={classes.td}>{theatre.tReferenceNumber}</td>
                                   <td className={classes.td}>{theatre.temail}</td>
                                   <td className={classes.td}>{theatre.tName}</td>
                                   <td className={classes.td}>{theatre.city}</td>
                                   <td className={classes.td}>
                                     <div className='flex'>
                                       <button onClick={()=>RemoveHandler(theatre.tReferenceNumber)} className='rounded-md bg-[blue] hover:bg-[indianred] text-white p-2 w-[6rem]'>
                                          Remove
                                       </button>
                                     </div> 
                                   </td>
                                 </tr>
                               
                               </>)
                    
                            })}
                         
                          </tbody>
                </table>
                    
                  </div>      
          </Container>}


        
    
       
    </div>
    
    
    </>
  )
}

export default Theatre