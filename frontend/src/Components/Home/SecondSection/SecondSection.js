import './SecondSection.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import MultiItemCarousal from '../../Common/MultiItemCarousel/MultiItemCarousal';
import Location from '../../Common/Location/Location';
import TheatreSearch from './Wrapper/TheatreSearch';
import Title from './Title/Title';
import SubTitle from './SubTitle/SubTitle';
import SearchDiv from './Wrapper/SearchDiv';
// import SearchBar from './SearchBar/SearchBar';
import MultiItemCarousalWrapper from '../../Common/MultiItemCarousel/MultiItemCarousalWrapper';
import CarousalTitle from './CarousalTitle/CarousalTitle';
import TheatreCard from './TheatreCard/TheatreCard'
import classes from './SecondSection.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import URL from '../../../URL';



const SecondSection=()=>{ 
  
  const [Tname,setTname]=useState("");
  const [loc,setloc]=useState("Vijayawada");
  const [flag,setflag]=useState(true);
  const [Titemarr,setTitemarr]=useState([]);
  const [Theatrearr,setTheatrearr]=useState([]);

  const navigate=useNavigate();

  const getDetails=async ()=>{
    const response = await fetch(URL+`/home`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body:JSON.stringify({loc:loc}),
    });

    console.log(response.status);

    if(response.status!==200)
     {
        navigate("*");
     }
   else
   {
    const res = await response.json();
    if(res.Tdetails.length===0)
    {
      setflag(false);
    }

    console.log(res.Tdetails);
    const arr=[];
    for(let i=0;i<res.Tdetails.length;i++)
    {   if(res.Tdetails[i]!=null)
            arr.push(<Link to={`/User/ViewTheatreProfile?treff=${res.Tdetails[i].tReferenceNumber}`}><TheatreCard key={i} Tdetail={res.Tdetails[i]}/></Link>);
    }  
    setTheatrearr(arr);

   }  


  };

  useEffect(()=>{
     getDetails();
  },[loc]);


  return ( 
  <div className={classes.style}>
    <TheatreSearch>
    <Container>     
           <Title/> 
           <SubTitle/>
        
      <SearchDiv>
        <Row>
           <Col lg={{span: 6, order: 1}} md={{span: 6, order: 1}} sm={{span: 12, order: 2}} xs={{span: 12, order: 2}}>
             {/* <SearchBar setTname={setTname} Tname={Tname}/> */}
          </Col>

           <Col lg={{span: 6, order: 2}} md={{span: 6, order: 2}} sm={{span: 12, order: 1}} xs={{span: 12, order: 1}}>
            <Location styleobj={{}} showcity={true} setloc={setloc} loc={loc}/>
          </Col>
        </Row>
      </SearchDiv>
          
          {flag && 
          <Row style={{marginTop:"2.5rem"}}>
             <CarousalTitle/>
         
                <MultiItemCarousalWrapper>
                  <Container>
                    <MultiItemCarousal itemarr={Theatrearr}/>
                 </Container>
    
                </MultiItemCarousalWrapper>   
               
          </Row>}

          {!flag && <p className='text-[1rem] text-[gold]'>No Theatres found in the specified location</p>}
      </Container>
  </TheatreSearch>
  </div>);
}

export default SecondSection;