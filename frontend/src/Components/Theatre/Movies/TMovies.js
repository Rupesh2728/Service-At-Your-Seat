import React, { useState, useEffect } from 'react';
import classes from './TMovies.module.css';
import TNavbar from '../TCommon/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import MovieInfo from '../../Admin/Movies/MovieInfo/MovieInfo';
import { AddMovie } from './AddMovie/Addmovie';
import { EditMovie } from './EditMovie/EditMovie';
import { RentMovie } from './RentMovie/RentMovie';
import URL from '../../../URL';







const TMovies = () => {

  const [AddMovieArray, setAddMovieArray] = useState([]);

  const [MoviesArray, setMoviesArray] = useState([]);

  const [rentedMovies, SetRentedMovies] = useState({});

  const [MoviesInfo, setMoviesInfo] = useState();
  const [tobj, setTobj] = useState(null);

 async function rentMovieHandler(data) {

    setShow4(false);
     let response=await fetch(URL+"/tmdashboard/rental",{

      method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: 'include'
        
     });

     let x=await response.json();
     
      renderdata();

  }

  const [showMovies, setShowMovies] = useState([]);



  async function AddedMovieHandler(data) {
    console.log(data);
    let res = await fetch(
      URL+"/tmdashboard/addmovie",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include'
      }
    );
    let x = await res.json();
    console.log(x);
    setShow2(false)
  }

  useEffect(() => {

    const gettheatredetails = async () => {
      console.log("came in");
      let res = await fetch(
        URL+"/tmdashboard/gettheatredetails",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
        }
      );
      let tobj = await res.json();
      console.log(tobj);
      setTobj(tobj);

    }
    gettheatredetails();

  }, [])

  let renderdata=  async () => {


    let response = await fetch(URL+"/tmdashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include', // <-- Important
    })

    let x = await response.json();
    console.log(x);
    setMoviesArray(x.rentalmoviearr);
    setShowMovies(x.activemoviearr);
    setAddMovieArray(x.inactivemoviearr);

  }

  useEffect(()=>{
    
  

  renderdata();


},[]);







  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);


  return (
    <div>

      {show1 && <MovieInfo show={show1} handleClose={handleClose1} MoviesInfo={MoviesInfo}/>}
      {show2 && <AddMovie AddedMovieHandler={AddedMovieHandler} AddMovieArray={AddMovieArray} show={show2} handleClose={handleClose2} />}
      {show3 && <EditMovie show={show3} handleClose={handleClose3} />}
      {show4 && <RentMovie rentMovieHandler={rentMovieHandler} rentedMovies={rentedMovies} show={show4} handleClose={handleClose4} tobj={tobj} />}
      <TNavbar />

      <div className='mt-[3rem]'>
        <div className='flex justify-between'>
          <h3 className={classes.title} style={{width:"25rem"}}>LATEST MOVIES SCREENING</h3>
          <div>
            <button type="button" className='bg-[red] w-[7rem] h-[2.2rem] mr-[3rem] rounded-md text-[white] hover:bg-[indianred]' onClick={handleShow2}>
              Add movie
            </button>

            <button type="button" className='bg-[red] w-[7rem] h-[2.2rem] mr-[3rem] rounded-md text-[white] hover:bg-[indianred]' onClick={handleShow3}>
              Edit Movie
            </button>
          </div>

        </div>


        <Row className='flex mt-[1rem]'>
          {showMovies.length === 0 && <p className='text-[gold] text-[2rem] mt-[1rem]'>OOPS...No Movies Screening Actively!!!</p>     }
          {showMovies.length !== 0  && showMovies.map((Movie, index) =>
            <Col lg={2} key={index}>
              <div className={classes.movie_card}>
                <img src={Movie.imgurl} alt='' />
                <div className='flex justify-between'>
                  <p className={classes.movie_name}>{Movie.MovieName}</p>
                </div>
                <div className={classes.card_bottom}>
                  <div className='text-white'>
                    <FontAwesomeIcon icon={faCheckCircle} className='text-[green] text-[1.5rem]' />
                  </div>

                  <div>
                    <button type="button" className='rounded-[50%] w-[2rem] border-none bg-[#221f1f]' onClick={()=>{setMoviesInfo(Movie);handleShow1()}} >
                      <FontAwesomeIcon icon={faInfoCircle} className='text-[indianred] text-[1.5rem]' />
                    </button>
                  </div>
                </div>
              </div>

            </Col>
          )}







        </Row>



        <div className='flex mt-[4rem]'>
          <h3 className={classes.title}>UPCOMING MOVIES</h3>
        </div>

        <Row className='flex mt-[1rem] mb-[3rem]' >
         {MoviesArray.length ===0 &&  <p className='text-[gold] text-[2rem] mt-[1rem]'>OOPS...No Upcoming Movies Actively!!!</p>  }   
          {MoviesArray.length !==0 && MoviesArray.map((Movie, index) =>
            <Col lg={2} key={index}>
              <div className={classes.movie_card}>
                <img src={Movie.imgurl} alt='' />
                <div className='flex justify-between'>
                  <p className={classes.movie_name}>{Movie.MovieName}</p>
                </div>
                <div className={classes.card_bottom}>


                  <div>
                    <button type="button" className='rounded-[50%] w-[2rem] border-none bg-[#221f1f]' onClick={()=>{setMoviesInfo(Movie);handleShow1()}}>
                      <FontAwesomeIcon icon={faInfoCircle} className='text-[indianred] text-[1.5rem]' />
                    </button>
                  </div>

                  <div>
                    <button type="button" className=' font-semibold rounded-md w-[4rem] border-none text-white h-[2rem] bg-[red]' onClick={() => {

                      const ans = MoviesArray.filter((movie, indexa) => {
                        return indexa === index;
                      })
                      // console.log(ans);
                      SetRentedMovies(ans[0]);
                      setShow4(true);

                    }}>
                      Rent
                    </button>
                  </div>
                </div>
              </div>

            </Col>

          )}


        </Row>

      </div>


    </div>
  )
}

export default TMovies