import React from 'react'
import TheatreSnacks from '../../Components/Theatre/Snacks/TheatreSnacks'
import Login from '../Login/Login';
import { useSelector } from 'react-redux';

const TSnacks = () => {
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===1)
  {
    return <Login/>;
  } 
  
  return (
    <><TheatreSnacks/></>
  )
}

export default TSnacks;