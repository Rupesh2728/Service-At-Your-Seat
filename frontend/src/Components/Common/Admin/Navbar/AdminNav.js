import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelopesBulk } from '@fortawesome/free-solid-svg-icons';
import {Link,useNavigate} from "react-router-dom";
import URL from '../../../../URL';





const AdminNav = ({signout}) => {

  const naviagte=useNavigate()
  
async function Logout(){
  
  

  await fetch(URL+'/signout', {
    method: 'get',
    headers: {
      "Content-Type": 'application/json'
    },
    credentials: 'include',
  });
  
  naviagte('/');

} 

  return (
    <Navbar expand="lg" className="bg-[#221f1f]">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          
          <Link to="/Admin"><span className='text-[gold] text-[1.2rem] mr-[1rem] pt-[1rem]'>Home</span></Link>
          <Link to="/Admin/MoviesPage"><span className='text-[gold] text-[1.2rem] mr-[1rem] pt-[1rem]'>Movies</span></Link>
          <Link to="/Admin/UserPage"><span className='text-[gold] text-[1.2rem] mr-[1rem] pt-[1rem]'>User</span></Link>
          <Link to="/Admin/TheatrePage"><span className='text-[gold] text-[1.2rem] mr-[1rem] pt-[1rem]'>Theatre</span></Link>
        </Nav>

        <div className='flex'>
         <Link to="/Admin/MailPage" className='mr-8'>
            <FontAwesomeIcon icon={faEnvelopesBulk} style={{color:"#ffd700",}} className='text-[1.5rem]'/>
          </Link>
          {signout && 
          <Link className='mr-6' onClick={Logout} >
            <button className=' border-0 bg-[red] text-white rounded-[5px] w-[5rem] h-[2rem]' >LogOut</button>
          </Link>
         }
         </div>
      </Navbar.Collapse>
  </Navbar>
  )
}

export default AdminNav