import React from 'react'
import Snacks from '../../Components/Snacks/Snacks'
import NavBar from '../../Components/Common/NavBar/NavBar'
import Footer from '../../Components/Common/Footer/Footer'
import FirstSection from '../../Components/Snacks/FirstSection/FirstSection'
import { useSelector } from 'react-redux'
import Login from '../Login/Login'

const SnacksPage = () => {
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===2)
  {
    return <Login/>;
  }
  
  return (
    <>
       <NavBar firstsection={FirstSection} pagename="Home"/>
       <Snacks/>
       <Footer/>
    </>
  )
}

export default SnacksPage