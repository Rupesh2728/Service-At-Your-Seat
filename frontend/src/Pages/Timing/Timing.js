import React from 'react'
import Timing from '../../Components/Timings/Timings'
import Login from '../Login/Login';
import { useSelector } from 'react-redux';
const Timings= () => {
  
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===2)
  {
    return <Login/>;
  }

  
 
  return (
    <>
     <Timing/>     
    </>
  )
}

export default Timings