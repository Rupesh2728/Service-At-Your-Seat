import React, { useEffect, useState } from 'react';
import classes from './User.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import AdminNav from '../../Common/Admin/Navbar/AdminNav';
import {Container} from 'react-bootstrap';
import URL from '../../../URL';






const User = () => {
  
  const [users,setusers]=useState([]);

  const get_users_func=async ()=>{
    let response = await fetch(URL+"/Adminclient", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const x = await response.json();
     const usersarr=[];
    for (let i=0; i<x.users.length; i++)
    {   if(x.users[i].email!=="saysadmin@gmail.com")
          usersarr.push(x.users[i]);
    }
    setusers(usersarr);
   }

    useEffect(()=>{
      get_users_func();
    },[]);


    const RemoveHandler=async (uid)=>{
      
      let response = await fetch(URL+"/Adminclient/removeuser", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({uid : uid}),
        credentials: 'include'
      });
      const res = await response.json();
      
       if(res.k===1)
       {
           get_users_func();
       }
       else
        {
          console.log("Unable to remove User");
        }
    }
  
  
  
  
  return (
    <>
        <AdminNav signout={false}/>
        <div className='mt-[3rem]'>
        <div className={classes.heading}>
            <h4>CLIENTS</h4>
        </div>

         {users.length===0 &&  <p className='text-[gold] text-[2rem] items-center text-center mt-[2rem]'>No Clients for the Website...Till Date</p>}
         {users.length!==0 && 
         <Container className='mt-[2rem] ml-[14.5rem]'>
         <div className={classes.clienttable}>  
           <table>
             <thead>
               <tr className={classes.headingrow}>
                 <th>Profile</th>
                 <th>CLient ReffNo.</th>
                 <th>CLient MailId</th>
                 <th>ClientName</th>
               </tr>
             </thead>
             
             <tbody>

               {users.map((user) =>{
                 return (<>
                  <tr key={user.UserReferenceNumber}>  
                   <td>
                       <img src="https://cdn.siasat.com/wp-content/uploads/2022/08/jr-ntr-health.jpg" alt="" className={classes.profilepic}/>
                   </td>
                   <td>{user.UserReferenceNumber}</td>
                   <td>{user.email}</td>
                   <td>{user.firstName}</td>
                   <td>
                     <div className='flex'>
                        <button onClick={()=>RemoveHandler(user.UserReferenceNumber)} className='rounded-md bg-[blue] hover:bg-[indianred] text-white p-2 w-[6rem]'>
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

export default User