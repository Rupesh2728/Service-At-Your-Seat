import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import TopNavBar from '../MobileNavBar/TopNavBar/TopNavBar';
import {AiOutlineMenu} from 'react-icons/ai'
import SlideWindow from './SlideWindow/SlideWindow';
const SlideNavBar = ({firstsection: FirstSection}) => {
  const [slidemenu,setslidemenu]=useState(false);
  const SlideMenuOpen=()=>{
     setslidemenu(!slidemenu);
  }
  
  return (
    <>
       <Row>
         <Col lg={1} sm={1} xs={1} className='sm:pt-[2.5rem] sm:px-4  2xs:pt-[2.2rem] 2xs:px-6'>
           <AiOutlineMenu size={30} color='white' className='2xs:w-[1.5rem] xs:w-[1.7rem] sm:w-[2rem]' onClick={SlideMenuOpen} />
         </Col>

         <Col>
            <TopNavBar/>
           </Col>
 
        {slidemenu &&  <SlideWindow SlideMenuOpen={SlideMenuOpen}/>}
        <FirstSection/>

       </Row>
    </>
  )
}

export default SlideNavBar