import React from 'react'
import UserProfile from '../../Components/UserProfile/UserProfile';
import Login from '../Login/Login';
import { useSelector } from 'react-redux';

const UserProfilePage = () => {
     
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===2)
  {
    return <Login/>;
  }

  return (
      <UserProfile/>
  )
}

export default UserProfilePage;