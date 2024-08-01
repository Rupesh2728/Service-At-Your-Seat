import React from 'react'
import Contactus from '../../Components/ContactUs/Contactus'
import Login from '../Login/Login';
import { useSelector } from 'react-redux';

const ContactUsPage = () => {
    
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===2)
  {
    return <Login/>;
  }

  
 
  return (
    <><Contactus/></>
  )
}

export default ContactUsPage