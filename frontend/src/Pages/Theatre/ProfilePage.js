import React from 'react'
import Profile from '../../Components/Theatre/Profile/ProfilePage'
import Login from '../Login/Login';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===1)
  {
    return <Login/>;
  } 

  
  return (
    <>
      <Profile/>
    </>
  )
}

export default ProfilePage