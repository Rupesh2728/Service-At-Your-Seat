import React from 'react'
import UserProfileEdit from '../../Components/UserProfile/UserProfileEdit';
import Login from '../Login/Login';
import { useSelector } from 'react-redux';

const UserProfileEditPage = () => {
     
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===2)
  {
    return <Login/>;
  }

  
  return (
   <UserProfileEdit/>
  )
}

export default UserProfileEditPage;