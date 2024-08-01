import React from 'react'
import Mail from '../../Components/Admin/Mail/Mail';
import Login from '../Login/Login';
import { useSelector } from 'react-redux';

const MailPage = () => {
  
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===1 || Client.Id===2)
  {
    return <Login/>;
  } 
  
  return (
    <>
      <Mail/>
    </>
  )
}

export default MailPage;