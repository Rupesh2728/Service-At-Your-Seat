import React from 'react'
import User from '../../Components/Admin/User/User';
import Login from '../Login/Login';
import { useSelector } from 'react-redux';
const UserPage = () => {
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===1 || Client.Id===2)
  {
    return <Login/>;
  } 

  return (
    <>
      <User/>
    </>
  )
}

export default UserPage