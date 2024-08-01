import React from 'react'
import Review from '../../Components/Review/Review'
import Login from '../Login/Login';
import { useSelector } from 'react-redux';

const ReviewPage = () => {
     
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===2)
  {
    return <Login/>;
  }
  
  return (
    <>
    <Review/>
    </>
  )
}

export default ReviewPage