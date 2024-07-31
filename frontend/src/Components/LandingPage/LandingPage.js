import React from 'react';
import FifthSection from "../Home/FifthSection/FifthSection";
import FirstSection from "../Home/FirstSection/FirstSection";
import FourthSection from "../Home/FourthSection/FourthSection";
import classes from './LandingPage.module.css';
import ThirdSection from "../Home/ThirdSection/ThirdSection";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import mainLogo from '../../Assests/finalmainlogo.png'
import { Link } from 'react-router-dom';

const LandingPage = () => {

  return (
    <div>
      <div className='flex justify-between'>
        <img src={mainLogo} className='w-[15rem] h-[8rem] mt-[1rem] ml-[1rem]' />
        <div className='mt-[2rem] mr-[2rem]'>
          <Link to="/login">
            <button className='w-[7rem] mr-[2rem] p-[0.5rem]  hover:cursor-pointer text-[1rem] hover:bg-[#3e2093] mt-[1rem] bg-[blue] rounded-[6px] text-[white]'>Login/SignUp</button>
          </Link>
          {/* <Link to="/login">
            <button className='w-[7rem] p-[0.5rem] hover:cursor-pointer text-[1rem] hover:bg-[#3e2093] mt-[1rem] bg-[blue] rounded-[6px] text-[white]'></button>
        </Link> */}
        </div>

      </div>



      <Container>
        <div className={classes.laptopfirstsection}>
          <FirstSection landingpage={true} />
        </div>
        <div >
          <ThirdSection landingpage={true} />
        </div>
        <FourthSection />
        <FifthSection />
      </Container>
    </div>
  )
}

export default LandingPage;