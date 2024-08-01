import React from 'react'
import SeatArrangement from '../../Components/SeatArrangement/SeatArrangement';
import { useSelector } from 'react-redux';
import Login from '../Login/Login';
const SeatArrangementPage = () => {
     
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===2)
  {
    return <Login/>;
  }

  
  
  return (
    <>
      <SeatArrangement/>
    </>
  )
}

export default SeatArrangementPage;