import React from 'react'
import Theatre from '../../Components/Admin/Theatre/Theatre';
import Login from '../Login/Login';
import { useSelector } from 'react-redux';
const TheatrePage = () => {
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===1 || Client.Id===2)
  {
    return <Login/>;
  } 

 
  return (
    <><Theatre/></>
  )
}

export default TheatrePage;