import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './SeatArrangement.module.css';
import { Link } from 'react-router-dom';
import { Container,Row} from 'react-bootstrap';
import Seat from './Seat/Seat';
import { useLocation, useNavigate } from 'react-router-dom';
import URL from '../../URL';


const SeatArrangement = () => {

    
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const MovieArray = JSON.parse(params.get('MovieArray'));
    const tReff=params.get('tReff');
    const time=params.get('time');
    const navigate=useNavigate();

    const[seatMatrix,setSeatMatrix]=useState([]);
    const [updatedseatarr,setupdatedseatarr]=useState([]);
    const [infoobj,setinfoobj]=useState({});
    
     async function renderSeats(){

      let res=await fetch(URL+`/movies/seatarrangement?name=${MovieArray.MovieName}&tReff=${tReff}&time=${time}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
            },
            credentials:'include'
      })
     
     let x=await res.json();
     setSeatMatrix(x.userbookingseatarr);
     const copyArray = x.userbookingseatarr.map(row => [...row]);
     setupdatedseatarr(copyArray);
     setinfoobj(x.infoobj);
     }
    
    useEffect(()=>{

      renderSeats();  

    },[]);

    const [selectedseatcount,setselectedseatcount]=useState(0);
    const [totalseatsprice,settotalseatsprice]=useState(0);
    const [selectedseatnums,setselectedseatnums]=useState([]);

    const OnProceed=async ()=>{
      
        const obj3={
            seatarr:updatedseatarr,
            tReff:infoobj.tReff,
            sname:infoobj.screenname,
          }
        
          
        const obj1=
        {
          MovieName:infoobj.mname,
          time:infoobj.showtime,
          screenname:infoobj.screenname,
          seatnumarr:selectedseatnums,
          tReff:infoobj.tReff,
        }
        
        
        let res2 = await fetch(URL+'/movies/seatarrangement/addticket', {
            method: 'post',
            body: JSON.stringify(obj1),
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include', 
        });


        let k=await res2.json();
        let res3 = await fetch(URL+'/movies/seatarrangement/updateseatsarr', {
            method: 'put',
            body: JSON.stringify(obj3),
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include', 
          });
        
          let k1=await res3.json();
          console.log(k);
          console.log(k1);
        
          if(k1.k===1 && k.k===1)
          {
            navigate("/User/RecentBookings");
          }
    }

  return (
    <div className={classes.body}>
    <div className='bg-[url("https://c1.wallpaperflare.com/preview/330/534/353/seat-chair-theatre-dark.jpg")] bg-no-repeat bg-cover bg-center'>

<div className={classes.back_to_home}>
    <Link to="/User/MoviesPage" className='relative z-10 '> 
      <button>Back to Movies</button>
    </Link>
</div>

    <div className={classes.main_body}>
        <div className={classes.side_image}>
            <img src={MovieArray.imgurl}  alt=""/>
        </div>

         <Container>
            <ul className={classes.display}>
                <li>
                     <Seat type={2}></Seat>
                    <small>Available</small>
                </li>

                <li>
                     <Seat type={5}></Seat>
                    <small>Selected </small>
                </li>

                <li>
                    <Seat type={4}></Seat>
                    <small>Sold Out </small>
                </li>

               <li>
                <Seat type={3}></Seat>
                <small>Premium</small>
              </li>

              <li>
                <Seat type={2}></Seat>
                <small>Normal</small>
              </li>
              
             <li>
                 <Seat type={1}></Seat>
                <small>Disabled</small>
            </li>
        </ul>   
                     
            <div className={classes.movie_title}>
                 <h1>
                    {infoobj.mname}
                </h1> 
            </div>
     
            <div className='flex justify-center mt-5'>
                <div>
                  {seatMatrix.map((row,rownum)=>{
                    return (
                    <Row className='flex'>
                        {row.map((seat,colnum)=>{      
                          return <Seat type={seat}  rownum={rownum} colnum={colnum} 
                          setselectedseatcount={setselectedseatcount} selectedseatcount={selectedseatcount}
                          settotalseatsprice={settotalseatsprice} totalseatsprice={totalseatsprice}
                          infoobj={infoobj} updatedseatarr={updatedseatarr}
                          setupdatedseatarr={setupdatedseatarr} selectedseatnums={selectedseatnums} setselectedseatnums={setselectedseatnums}></Seat>        
                        })} 
                    </Row>)

                  })}         
                </div>
            </div>

             <div className="mt-[3rem]">
                <p className='flex justify-center'>------All Eyes This Way------</p>
             </div>
            
       
            <div className="flex justify-center mt-4">
                <div className={classes.proceed_button}>
                     {selectedseatcount<=4 &&
                     <>
                     {selectedseatcount>0 && 
                      <div className='rounded-md flex justify-center'>
                       <button onClick={OnProceed} className='bg-[blue] p-2 text-[1.1rem] rounded-md hover:bg-[green]'>Proceed</button>
                     </div>}

                    <p className={classes.text}>
                        You have selected <span id="count">{selectedseatcount}</span> seat(s) for a price of RS.<span id="total">{totalseatsprice}</span>
                    </p>
                     </>}

                    {selectedseatcount>4 && 
                     <p className={classes.text}>
                        You can only book a <span className='text-[1.1rem]'>maximum of 4 seats at a time</span>
                    </p>}
                </div>
            </div>

        </Container>
    </div>
    </div>
    </div>
  )
}

export default SeatArrangement