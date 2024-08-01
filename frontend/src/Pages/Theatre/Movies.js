import React from 'react'
import TMovies from '../../Components/Theatre/Movies/TMovies';
import { useSelector } from 'react-redux';
import Login from '../Login/Login';

const TMoviesPage = () => {
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===1)
  {
    return <Login/>;
  } 
 
  return (
    <>
      <TMovies/>
    </>
  )
}

export default TMoviesPage;