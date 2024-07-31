import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './UserProfile.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'react-bootstrap';
import profileimg from '../../Assests/UserProfile/image.jpg';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';
import URL from '../../URL';




const UserProfile = () => {
  const [key, setKey] = useState("about");


  const [userdetails, setuserdetails] = useState({});
  const [imageSrc, setImageSrc] = useState("https://png.pngtree.com/png-vector/20190501/ourmid/pngtree-users-icon-design-png-image_1014936.jpg");
  const [selectedFile, setSelectedFile] = useState(null);

  const renderUserpic = async () => {
    // console.log("hi");
    const res = await fetch(URL+'/profile/profilepic', {
      method: 'get',
      headers: {
        "Content-Type": 'application/json'
      },
      credentials: 'include',
    });
    const blob = await res.blob();
    if (blob.size <= 3) {
      return;
    }
    const imageUrl = URL.createObjectURL(blob);
    setImageSrc(imageUrl);

  }

  const renderUserDetails = async () => {
    const res = await fetch(URL+'/profile/laptopprofilepage/getdetails', {
      method: 'get',
      headers: {
        "Content-Type": 'application/json'
      },
      credentials: 'include',
    });

    const response = await res.json();
    setuserdetails(response[0]);
  }

  useEffect(() => {
    renderUserDetails();
    renderUserpic();
  }, []);



  async function onImageChangeHandler(e) {
    const file = e.target.files[0];

    // Update the state with the selected file
    setSelectedFile(file);

    // Upload the file immediately
    uploadFile(file);
  }

  const uploadFile = (file) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch(URL+'/profileUpload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          renderUserpic();
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle errors
        });
    } else {
      console.log('No file selected');
    }
  };



  return (
    <Container>
      <div className={classes.emp_profile}>

        <Row>
          <Col md={3} lg={3}>
            <form id='uploadform'>
              <div className={classes.profile_img}>
                <img className={classes.profilepic} src={imageSrc} alt="PROFILE PIC" />
                <div className={classes.file} style={{ width: '12rem', borderRadius: '5px' }} >
                  <Button className='border-0'>Change Photo</Button>
                  <input type="file" name="file" className={classes.input} onChange={onImageChangeHandler} />
                </div>
              </div>
            </form>

            <div className={classes.profile_work}>
              <p>For Queries</p>
              <Link to="/" className={classes.contactuslink}><i className="fa-solid fa-messages"></i> ContactUS</Link><br />
              <p>For Info</p>
              <Link to="/" className={classes.contactuslink}><i className="fa-regular fa-address-card"></i> AboutUS</Link><br />
              <p>Can FollowUs on</p>
              <Link to="/" className={classes.twitterlink}><FontAwesomeIcon icon={faTwitter} /> Twitter</Link><br />
              <Link to="/" className={classes.instalink}><FontAwesomeIcon icon={faInstagram} /> Instagram</Link><br />
              <Link to="/" className={classes.youtubelink}><FontAwesomeIcon icon={faYoutube} /> Youtube</Link><br />
              <Link to="/" className={classes.fblink}><FontAwesomeIcon icon={faFacebook} /> Facebook</Link><br />
            </div>


          </Col>

          <Col md={9} lg={9}>
            <div className={classes.profile_head}>
              <div className='flex justify-between'>
                <h5 className={classes.name}>
                  {userdetails.firstName}
                </h5>

                <Link to="/user/editprofile"><button className={classes.profile_edit_btn} type="button">Edit Profile</button></Link>
              </div>

              <p className={classes.profile_rating}>User Reference Number :
                <span className="pl-2 text-[#495057] font-[600] text-[15px]">{userdetails.UserReferenceNumber}</span>
              </p>




              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 mt-3"
              >

                <Tab eventKey="about" title="About">
                  <div className='mt-[5rem]'>
                    <Row className='mt-3'>
                      <Col md={6}>
                        <label className='text-white'>First Name</label>
                      </Col>

                      <Col md={6}>
                        <p className='text-[#daa520]'>{userdetails.firstName}</p>
                      </Col>
                    </Row>


                    <Row className='mt-3'>
                      <Col md={6}>
                        <label className='text-white'>Last Name</label>
                      </Col>

                      <Col md={6}>
                        <p className='text-[#daa520]'>{userdetails.lastName}</p>
                      </Col>
                    </Row>


                    <Row className='mt-3'>
                      <Col md={6}>
                        <label className='text-white'>Email</label>
                      </Col>

                      <Col md={6}>
                        <p className='text-[#daa520]'>{userdetails.email}</p>
                      </Col>
                    </Row>


                    <Row className='mt-3'>
                      <Col md={6}>
                        <label className='text-white'>Phone</label>
                      </Col>

                      <Col md={6}>
                        <p className='text-[#daa520]'>91+ {userdetails.MobileNumber}</p>
                      </Col>
                    </Row>


                    <Row className='mt-3'>
                      <Col md={6}>
                        <label className='text-white'>Gender</label>
                      </Col>

                      <Col md={6}>
                        <p className='text-[#daa520]'>{userdetails.Gender}</p>
                      </Col>
                    </Row>


                    <Row className='mt-3'>
                      <Col md={6}>
                        <label className='text-white'>Date of birth</label>
                      </Col>

                      <Col md={6}>
                        <p className='text-[#daa520]'>{new Date(userdetails.DOB).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      </Col>
                    </Row>
                  </div>
                </Tab>

                <Tab eventKey="carddetails" title="Card details">
                  <div className='mt-[5rem]'>
                    <Row className='mt-3'>
                      <Col md={6}>
                        <label className='text-white'>Card Holder Name</label>
                      </Col>

                      <Col md={6}>
                        <p className='text-[#daa520]'>{userdetails.cardName}</p>
                      </Col>
                    </Row>

                    <Row className='mt-3'>
                      <Col md={6}>
                        <label className='text-white'>Card Number</label>
                      </Col>

                      <Col md={6}>
                        <p className='text-[#daa520]'>{"xxxx xxxx xxxx " + String(userdetails.cardNumber).slice(-4)}</p>
                      </Col>
                    </Row>


                    <Row className='mt-3'>
                      <Col md={6}>
                        <label className='text-white'>CVV</label>
                      </Col>

                      <Col md={6}>
                        <p className='text-[#daa520]'>xxx</p>
                      </Col>
                    </Row>


                    <Row className='mt-3'>
                      <Col md={6}>
                        <label className='text-white'>Expiry</label>
                      </Col>

                      <Col md={6}>
                        <p className='text-[#daa520]'>xx</p>
                      </Col>
                    </Row>

                    <Row className='mt-3'>
                      <Col md={6}>
                        <label className='text-white'>Email</label>
                      </Col>

                      <Col md={6}>
                        <p className='text-[#daa520]'>{userdetails.email}</p>
                      </Col>
                    </Row>
                  </div>
                </Tab>
              </Tabs>

              <div className={classes.back_home}>
                <Link to="/User/HomePage">
                  <button>Back to home</button>
                </Link>

              </div>
            </div>

          </Col>

        </Row>

      </div>
    </Container>
  )
}

export default UserProfile