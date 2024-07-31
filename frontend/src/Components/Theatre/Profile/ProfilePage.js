import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import internalCss from './ProfilePage.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import URL from '../../../URL';



const TheatreProfile = () => {
  const [Tdetails,setTdetails]=useState({});
  
  const getdetails = async () =>{
   
     const response = await fetch(URL+"/tprofile",
     {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
       },
       credentials:'include',
     },
    
   );
   const res = await response.json();
   setTdetails(res);
  }

  useEffect(() => {
    getdetails();
  });
  return (
    <div className={internalCss.maindiv} style={{
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      background: 'url("https://c1.wallpaperflare.com/preview/330/534/353/seat-chair-theatre-dark.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '130vh',
      display: 'flex',
      flexDirection: 'column'
    }}>

      {/* Profile Section */}
      <div className={internalCss.profilepage} style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to="/Theatre/Theatredashboard">
              <button className="btn btn-primary editbtn mt-[2rem] ml-[1.5rem]">Back to Home</button>
            </Link>
        <h1 className={internalCss.profileheading}>Profile </h1>
        <Row className={internalCss.topdiv} style={{ display: 'flex' }}>
          {/* Image */}
          <Col className={internalCss.image}>
            <img
              src="https://content3.jdmagicbox.com/comp/vijayawada/g8/0866px866.x866.150206151341.h1g8/catalogue/stbl-s-balaji-cine-villa-poranki-vijayawada-telugu-movies-ibmzlh5shx.jpg"
              className={internalCss.profileimg}
              alt="Theatre Profile"
            />
          </Col>

          {/* About Section */}
          <Col className={internalCss.about}>
            <Container>
              
              <Row className='mt-[2rem]'>
                <Col>
                  <p style={{ color: 'gold' }}>Reference Number</p>
                </Col>
                <Col>
                  <p id={internalCss.REFnumber}>{Tdetails.tReferenceNumber}</p>
                </Col>
              </Row >
              <Row className='mt-[2rem]'>
                <Col>
                  <p style={{ color: 'gold' }}>Address</p>
                </Col>
                <Col>
                  <p id={internalCss.Address} className='w-[15rem]'>{Tdetails.street}, {Tdetails.city}, {Tdetails.state}, {Tdetails.pincode}</p>
                </Col>
              </Row>
              <Row className='mt-[2rem]'>
                <Col>
                  <p style={{ color: 'gold' }}>Theatre</p>
                </Col>
                <Col id={internalCss.TheatreName}>
                  {Tdetails.tName}
                </Col>
              </Row>
              <Row className='mt-[2rem]'>
                <Col>
                  <p style={{ color: 'gold' }}>Contact</p>
                </Col>
                <Col id={internalCss.phnNumber}>
                  +91 {Tdetails.tNumber1}
                </Col>
              </Row>
              <Row className='mt-[2rem]'>
                <Col>
                  <p style={{ color: 'gold' }}>MailId</p>
                </Col>
                <Col id={internalCss.mailid}>
                  {Tdetails.temail}
                </Col>
              </Row>
              <Row className='mt-[2rem]'>
                <Col>
                  <p style={{ color: 'gold' }}>License Number</p>
                </Col>
                <Col id={internalCss.License_Number}>
                  {Tdetails.licensenum}
                </Col>
              </Row>
            </Container>
          </Col>
          

          {/* Edit Button */}
          <Col className={internalCss.editbtn}>
            <Link to="#">
              <button className="btn btn-primary editbtn">Edit Profile</button>
            </Link>
          </Col>
        </Row>


        {/* Nearby Places Section */}
        <div className={internalCss.bottomdiv}>
          <h3 style={{ marginLeft: '1rem' }}>Nearby Places</h3>
          <Container>
            <Row className='flex'>
               <Col>
               <div>  
                  <p className='absolute'>1</p> 
                      <img className='w-[8.5rem] h-[9rem]' src='https://png.pngtree.com/png-clipart/20220916/original/pngtree-red-location-pin-icon-with-folded-map-png-image_8620106.png'/>
                      <p className='text-[1.2rem]'>{Tdetails.nearbyplace1}</p>
                </div>
               </Col>

               <Col>
               <div>  
                  <p className='absolute'>2</p> 
                      <img className='w-[8.5rem] h-[9rem]' src='https://png.pngtree.com/png-clipart/20220916/original/pngtree-red-location-pin-icon-with-folded-map-png-image_8620106.png'/>
                      <p className='text-[1.2rem]'>{Tdetails.nearbyplace2}</p>
                </div>
               </Col>

               <Col>
               <div>  
                  <p className='absolute'>3</p> 
                      <img className='w-[8.5rem] h-[9rem]' src='https://png.pngtree.com/png-clipart/20220916/original/pngtree-red-location-pin-icon-with-folded-map-png-image_8620106.png'/>
                      <p className='text-[1.2rem]'>{Tdetails.nearbyplace3}</p>
                </div>
               </Col>

               <Col>
               <div>  
                  <p className='absolute'>4</p> 
                      <img className='w-[8.5rem] h-[9rem]' src='https://png.pngtree.com/png-clipart/20220916/original/pngtree-red-location-pin-icon-with-folded-map-png-image_8620106.png'/>
                      <p className='text-[1.2rem]'>{Tdetails.nearbyplace4}</p>
                </div>
               </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default TheatreProfile;