import React from 'react'
import Individual from '../../Components/IndividualMoviePage/Individual'
import { useSelector } from 'react-redux';
import Login from '../Login/Login';
const IndividualPage= () => {
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===2)
  {
    return <Login/>;
  }
  
  return (
    <>
     <Individual/>     
    </>
  )
}

export default IndividualPage