import React, { useEffect, useState } from 'react'
import classes from './TSchedule.module.css';
import TNavbar from '../TCommon/navbar';
import { Container } from 'react-bootstrap';
import AddScreen from './AddScreen/AddScreen';
import AddShow from './AddShow/AddShow';
import URL from '../../../URL';



const TSchedule = () => {

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // const [show3, setShow3] = useState(false);
  // const handleClose3 = () => setShow3(false);
  // const handleShow3 = () => setShow3(true);

  // const [show4, setShow4] = useState(false);
  // const handleClose4 = () => setShow4(false);
  // const handleShow4 = () => setShow4(true);

  const [screens, setScreens] = useState([]);

  const [shows, setShows] = useState([])
  const [MoviesArray,setMoviesArray]=useState([]);

  async function renderDeatils() {

    let res = await fetch(URL+"/tschedule/", {

      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:'include'

    })

    let x = await res.json();


    console.log(x);
    setScreens(x.screeninfoarr);
    setShows(x.movieshowdetails);
    setMoviesArray(x.curractivemoviesinfo);


  }

  useEffect(() => {

    renderDeatils();


  }, []);



  async function addScreenHandler(data) {
    console.log(data);

    let response = await fetch(
      URL+"/tschedule/addscreen",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include'
      },
     
    );
    let k = await response.json();
    k = k.confirm;
    if (k === 1) {
      console.log("HI");
      renderDeatils();
    }
  }



  const editscreenHandler =async (data)=>{

    let response = await fetch(URL+"/tschedule/editsavescreen",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include'
      },
     
    );
    let k = await response.json();
    k = k.confirm;
    if (k === 1) {
      renderDeatils();
    }
  }


  const RemoveScreenHandler=async (scrname)=>{
    const response=await fetch(URL+`/tschedule/removescreen`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:'include',
      body:JSON.stringify({scrname:scrname}),
      
    });

   const res=await response.json();
   console.log(res);
   if(res.confirm===1)
   {
      renderDeatils();
   }

  }

  const RemoveShowHandler=async (removemname,sname,showtime)=>{
    const response=await fetch(URL+`/tschedule/removeshow`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:'include',
      body:JSON.stringify({removemname:removemname,screenname:sname,showtime:showtime}),
      
    });

   const res=await response.json();
   console.log(res);
   if(res.confirm===1)
   {
      renderDeatils();
   }

  }

 async function addShowHandler(data) {


    let response = await fetch(
      URL+"/tschedule/addshow",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include'
      },
     
    );
    let k = await response.json();
 console.log(k);
 renderDeatils();
  }

  return (
    <div>

      {show1 && <AddScreen show={show1} handleClose={handleClose1} addScreenHandler={addScreenHandler} />}
      {show2 && <AddShow show={show2} handleClose={handleClose2} screens={screens} addShowHandler={addShowHandler}  MoviesArray={MoviesArray}/>}
      {/* {show2 && <AddMovie show={show2} handleClose={handleClose2}/>}
     {show3 && <EditMovie show={show3} handleClose={handleClose3}/>}
     {show4 && <RentMovie show={show4} handleClose={handleClose4}/>} */}

      <TNavbar />
      <div className='mt-[3rem]'>
        <div className={classes.heading}>
          <h4 className={classes.h4}>Main Screens</h4>
          <div className='flex justify-evenly'>
            <button onClick={handleShow1} type="button" className='bg-[green] w-[8rem] h-[2.2rem] mr-[2rem] mt-[1rem] rounded-md text-[white] hover:bg-[indianred]'>
              Add
            </button>
          </div>
        </div>


        <Container className='mt-[2rem]'>
        {screens.length === 0 && <p className='text-[gold] text-[2rem] text-center'>OOPS...No Screens In Your Theatre</p>}
          <div className={classes.screentable}>
            {screens.length!==0 && 
            <table>
            <thead>
              <tr className={classes.headingrow}>
                <th>#</th>
                <th>Screen Name</th>
                <th>Screen Capacity</th>
                <th>Seating Arrangement</th>
                <th>Remove Screen</th>
              </tr>
            </thead>
            <tbody>
              {screens.map((screeninfo, index) =>
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{screeninfo.screenname}</td>
                  <td>{screeninfo.screencapacity}</td>
                  <td>
                    <button type="button" className='bg-[blue] w-[6rem] h-[2.2rem] mr-[3rem] rounded-md text-[white] hover:bg-[indianred]'>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={()=>RemoveScreenHandler(screeninfo.screenname)} type="button" className='bg-[blue] w-[6rem] h-[2.2rem] mr-[3rem] rounded-md text-[white] hover:bg-[indianred]'>
                      Remove
                    </button>
                  </td>
                </tr>

              )}
            </tbody>
          </table>}


          </div>
          
        
        </Container>
      </div>

      <div className='h-[0.01rem] bg-white w-[80%] ml-[9rem] mt-[3rem]'></div>

      <h2 className={classes.schedulingheading}>SCREEN SCHEDULING</h2>
      <div className='mt-[3rem]'>
        <div className={classes.heading}>
          <h4 className={classes.h4}>Movie Shows</h4>
          <div className='flex justify-evenly'>
            <button onClick={handleShow2} type="button" className='bg-[green] w-[8rem] h-[2.2rem] mr-[2rem] mt-[1rem] rounded-md text-[white] hover:bg-[indianred]'>
              Add
            </button>
          </div>
        </div>


        <div className='mt-[2rem] ml-[8rem]'>
          {shows.length ===0 && <p className='text-[gold] text-[2rem] text-center'>OOPS...No Screens In Your Theatre</p>}
          
          <div className={classes.showsdatatable}>
          {shows.length !==0 &&
          <table>
            <thead>
              <tr className={classes.headingrow}>
                <th>#</th>
                <th>Show Time</th>
                <th>Duration</th>
                <th>Screen Name</th>
                <th>Movie Name</th>
                <th>Show From Date</th>
                <th>Show To Date</th>
              </tr>
            </thead>
            <tbody>
        
              {shows.map((show, index) =>

                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{show.showtime}</td>
                  <td>{show.duration}</td>
                  <td>{show.screenname}</td>
                  <td>{show.MovieName}</td>
                  <td>{show.fromdate}</td>
                  <td>{show.todate}</td>
                  <td>
                    <button type="button" className='bg-[blue] w-[6rem] h-[2.2rem] rounded-md text-[white] hover:bg-[indianred]'>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={()=>RemoveShowHandler(show.MovieName,show.screenname,show.showtime)} type="button" className='bg-[blue] w-[6rem] h-[2.2rem] mr-[1rem] rounded-md text-[white] hover:bg-[indianred]'>
                      Remove
                    </button>
                  </td>
                </tr>

              )}


            </tbody>
          </table>}
        </div>
          
        </div>
      </div>





    </div>



  )
}

export default TSchedule