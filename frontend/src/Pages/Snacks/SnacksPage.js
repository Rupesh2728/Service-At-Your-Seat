import React from 'react'
import Snacks from '../../Components/Snacks/Snacks'
import NavBar from '../../Components/Common/NavBar/NavBar'
import Footer from '../../Components/Common/Footer/Footer'
import FirstSection from '../../Components/Snacks/FirstSection/FirstSection'
const SnacksPage = () => {
  return (
    <>
       <NavBar firstsection={FirstSection} pagename="Home"/>
       <Snacks/>
       <Footer/>
    </>
  )
}

export default SnacksPage