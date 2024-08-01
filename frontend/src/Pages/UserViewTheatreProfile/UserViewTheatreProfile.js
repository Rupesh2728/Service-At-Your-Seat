import React from 'react'
import UserVIewTProfile from '../../Components/UserViewTProfile/UserViewTProfile'
import Login from '../Login/Login';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserViewTheatreProfile = () => {
 
     
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===2)
  {
    return <Login/>;
  }

 
  return (
    <div><UserVIewTProfile/></div>
  )
}

export default UserViewTheatreProfile