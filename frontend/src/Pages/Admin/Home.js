import React from 'react'
import Home from '../../Components/Admin/Home/Home';
import { useSelector } from 'react-redux';
import Login from '../Login/Login';

const HomePage = () => {
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===1 || Client.Id===2)
  {
    return <Login/>;
  } 

  return (
    <><Home/></>
  )
}

export default HomePage