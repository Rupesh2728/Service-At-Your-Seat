import React from 'react'
import { Movies } from '../../Components/Admin/Movies/Movies';
import Login from '../Login/Login';
import { useSelector } from 'react-redux';

const MoviesPage = () => {
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===1 || Client.Id===2)
  {
    return <Login/>;
  } 
  
  return (
    <>  
    <Movies/>
    </>
  )
}

export default MoviesPage;