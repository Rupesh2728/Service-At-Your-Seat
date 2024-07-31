import React, { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './UserViewTProfile.module.css';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation,useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import URL from '../../URL';




const UserVIewTProfile = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const treff = (params.get('treff'));
    const [Tdetails,setTdetails]=useState({});
    const [nearbyplaces,setnearbyplaces]=useState({});
    const navigate=useNavigate();
    // const [treff,settreff]=useState("");

   const LoadDetails=async (treff)=>{
    const response=await fetch(URL+`/usertheatreprofile?treff=${treff}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:'include'
      });

    const res=await response.json();
    setnearbyplaces(res.nearbyplaces);
    setTdetails(res.Tdetails);
    console.log(res);  
   }
    
    useEffect(()=>{
        const treff = (params.get('treff'));
        LoadDetails(treff); 
    },[treff])

   const onClickHandler=()=>{
     navigate(`/User/Treview?treff=${treff}`);
   }
  
  
  
    return (
    <div className={classes.body} style={{fontFamily:'serif'}}>
    <div className={classes.reviewlink}><button  className={classes.Reviewbutton} onClick={onClickHandler}> Review This Theatre</button></div>
   <div className={classes.main}>
       <div className={classes.container1}>
           <h1 className={classes.h1}>{Tdetails.tName}</h1>
       </div>
       <div className={classes.container2}>
        <Carousel controls={false} indicators={false}>   
            <Carousel.Item interval={1000}>
                <div className='flex justify-center'>
                    <img src={Tdetails.imgurl1} className="w-[45%] h-[45%] justify-center" alt="..."/>
                </div>         
            </Carousel.Item>

            <Carousel.Item interval={1000}>
                <div className='flex justify-center'>
                    <img src={Tdetails.imgurl2} className="w-[45%] h-[45%] justify-center" alt="..."/>
                </div>         
            </Carousel.Item>

            <Carousel.Item interval={1000}>
                <div className='flex justify-center'>
                    <img src={Tdetails.imgurl3} className="w-[45%] h-[45%] justify-center" alt="..."/>
                </div>         
            </Carousel.Item>
          

        </Carousel>
          
           <div className={classes.container3}>
               <Row>
                <Col> 
                   <h4 className='text-[gold] font-serif text-[1.3rem]'>Screen</h4>
                   <p className={classes.ptag} style={{fontStyle:"italic"}}>{Tdetails.screentype} </p> 
                </Col>

                <Col> 
                   <h4 className='text-[gold] font-serif text-[1.3rem]'>Snacks</h4>
                   <p className={classes.ptag} style={{fontStyle:"italic"}}>{Tdetails.snacks}</p>
                </Col>

                <Col> 
                    <h4 className='text-[gold] font-serif text-[1.3rem]'>AC/Non-AC</h4>
                    <p className={classes.ptag} style={{fontStyle:"italic"}}>{Tdetails.Ttype}</p>
                </Col>

                <Col> 
                     <h4 className='text-[gold] font-serif text-[1.3rem]'>Sound</h4>
                     <p className={classes.ptag} style={{fontStyle:"italic"}}>{Tdetails.sound}</p>
                </Col>
               </Row>
           </div>


           <div className={classes.container4}>
            <div className='flex justify-center'>
               <h2 className={classes.aboutheading}>About</h2>
            </div>
               <p className='text-[1.25rem] mt-[1.5rem] font-serif' style={{fontStyle:"italic"}}>
                   {Tdetails.about}
               </p>
           </div>
           <div className='mt-[3rem]'>
               <div className='flex justify-center mt-[1rem]'>
               <h2 className={classes.nearbyplacesheading}>Near by places </h2>
               </div>
               <Container className='mt-[1rem]'>
                <Row>
                     <Col className=' items-center justify-center'>
                           <div className={classes.image}>  
                               <p className='ml-[4rem] font-serif' style={{fontStyle:"italic"}}>1</p>
                               <img alt='' className='border-0 ml-[9rem]' src='https://png.pngtree.com/png-clipart/20220916/original/pngtree-red-location-pin-icon-with-folded-map-png-image_8620106.png'/>
                               <p className={classes.ptag} style={{fontFamily:'serif',fontStyle:'italic'}}>{nearbyplaces.nearbyplace1}</p>
                           </div>
                    </Col> 

                    <Col className=' items-center'>
                           <div className={classes.image}>
                           <p className='ml-[4rem] font-serif' style={{fontStyle:"italic"}}>2</p>
                           <img alt='' className='border-0 ml-[9rem]' src='https://png.pngtree.com/png-clipart/20220916/original/pngtree-red-location-pin-icon-with-folded-map-png-image_8620106.png'/>
                               <p className={classes.ptag} style={{fontFamily:'serif',fontStyle:'italic'}}>{nearbyplaces.nearbyplace2}</p>
                           </div>
                    </Col> 

                    <Col className=' items-center'>
                            <div className={classes.image}>
                            <p className='ml-[4rem] font-serif' style={{fontStyle:"italic"}}>3</p>
                            <img alt='' className='border-0 ml-[9rem]' src='https://png.pngtree.com/png-clipart/20220916/original/pngtree-red-location-pin-icon-with-folded-map-png-image_8620106.png'/>
                               <p className={classes.ptag} style={{fontFamily:'serif',fontStyle:'italic'}}>{nearbyplaces.nearbyplace3}</p>
                           </div>
                    </Col> 

                    <Col className=' items-center'>
                           <div className={classes.image}>
                           <p className='ml-[4rem] font-serif' style={{fontStyle:"italic"}}>4</p>
                           <img alt='' className='border-0 ml-[9rem]' src='https://png.pngtree.com/png-clipart/20220916/original/pngtree-red-location-pin-icon-with-folded-map-png-image_8620106.png'/>
                               <p className={classes.ptag} style={{fontFamily:'serif',fontStyle:'italic'}}>{nearbyplaces.nearbyplace4}</p>
                           </div>
                    </Col>  
                   </Row>
              
               </Container>
           </div>
       </div>

   </div>
</div>
  )
}

export default UserVIewTProfile