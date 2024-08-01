import React from 'react'
import Recentbookings from '../../Components/RecentBookings/Recentbookings'
import Login from '../Login/Login';
import { useSelector } from 'react-redux';
const RecentBookings= () => {
 
     
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===2)
  {
    return <Login/>;
  }

  
 
  return (
    <>
     <Recentbookings/>     
    </>
  )
}

export default RecentBookings