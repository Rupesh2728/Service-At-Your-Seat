import React, { useEffect, useState, useContext, useCallback } from 'react';
import AdminNav from '../../Common/Admin/Navbar/AdminNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import classes from './Movies.module.css';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { RemoveModal } from './RemoveMovies/RemoveModal';
import AddMovies from './AddMovies/AddMovies';
import MovieInfo from './MovieInfo/MovieInfo';

import { MyContext } from "../../../Contexts/MoviesContext";
import URL from '../../../URL';

export const Movies = () => {

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () =>setShow3(true);
  



  const [MoviesArray, setMoviesArray] = useState([]);
  const [Location, setLocation] = useState([]);
  const [MoviesInfo, setMoviesInfo] = useState();

  const renderMovies =useCallback( async () => {
  let response = await fetch(URL+"/Adminmovies", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const x = await response.json();
  console.log(x);
  setMoviesArray(x.rentalmoviearr);
  setLocation(x.rentalmovieslocarr);
},[show1])


  useEffect(() => {
    renderMovies();
  }, []);


  async function onSubmit({ MovieName, MovieImageURL, Language, ReleaseDate, Duration, Genre, Locations, CastName1, CastImageURL1, CastName2, CastImageURL2, CastName3, CastImageURL3, CastName4, CastImageURL4, CastName5, CastImageURL5, About }) {

   

    let x =  {
      mName: MovieName,
      theatreimgurl: MovieImageURL,
      lang: Language,
      rd: ReleaseDate,
      duration: Duration,
      genre: Genre,
      locs: Locations,

      cn1: CastName1,
      cimg1: CastImageURL1,

      cn2: CastName2,
      cimg2: CastImageURL2,

      cn3: CastName3,
      cimg3: CastImageURL3,

      cn4: CastName4,
      cimg4: CastImageURL4,

      cn5: CastName5,
      cimg5: CastImageURL5,

      about: About
    };
     
    console.log(x);
    let response = await fetch(URL+"/Adminmovies/adminrentalmovieinfo", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(x),
    credentials: 'include'
  });
  const x1 = await response.json();
     
  console.log(x1);
   
  renderMovies();
    setShow2(false);

  }


  const { dataArray, setDataArray } = useContext(MyContext);
  useEffect(() => {
    setDataArray([...MoviesArray]);
  }, [MoviesArray]);


  // Remove movie
  const [removemovie,setremovemovie]=useState("Select Movie");

  const RemoveHandler=async ()=>{
    let response = await fetch(URL+"/Adminmovies/adminremovemovie", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({moviename : removemovie}),
    credentials: 'include'
  });
  const res = await response.json();
  
   if(res.k===1)
   {
    renderMovies();
   }
   else
    {
      console.log("Unable to remove movie");
    }
  }


  return (
    <div className={classes.body}>
      {show1 && <RemoveModal show={show1} handleClose={handleClose1} MoviesArray={MoviesArray} RemoveHandler={RemoveHandler} setremovemovie={setremovemovie} removemovie={removemovie} />}
      {show2 && <AddMovies onSubmit={onSubmit} show={show2} handleClose={handleClose2} />}
      {show3 && <MovieInfo show={show3} handleClose={handleClose3} MoviesInfo={MoviesInfo} />}

      <AdminNav signout={false} />
      <div className='mt-[2rem]'>
        <div className='flex justify-between'>
          <div className='flex'>
            <label htmlFor="location" className='text-[white] text-[1.2rem] mt-1'>Location:</label>

            <Dropdown className='text-white bg-[#221f1f] border-none ml-2'>
              <Dropdown.Toggle className='text-white bg-[#221f1f] border-none'>
                Vijayawada
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Location.map((location, index) =>
                  <Dropdown.Item key={index}>{location}</Dropdown.Item>
                )}


              </Dropdown.Menu>
            </Dropdown>
          </div>

          <button type="button" className={classes.addbtn} onClick={handleShow2}>
            Add Movie
          </button>
        </div>


        <div className='flex justify-between mt-[2.5rem]'>
          <h3 className={classes.title}>RENTAL MOVIES</h3>
          <button type="button" className={classes.addbtn} onClick={handleShow1}>
            Remove Movie
          </button>
        </div>

        <Row>
            {MoviesArray.map((movieIndex, index) =>
              <Col lg={2} md={2} key={index}>
                <div className={classes.movie_card}>
                  <img src={movieIndex.imgurl} alt='' />
                  <div className={classes.movie_info}>
                    <p className={classes.movie_name}>{movieIndex.MovieName}</p>
                  </div>
                  <div className={classes.card_bottom}>
                    <div>
                      <button className="rounded-[50%] w-[2rem] bg-[#221f1f] border-0" type="button" onClick={()=>{setMoviesInfo(movieIndex);handleShow3()}}>
                        <FontAwesomeIcon icon={faInfoCircle} className='text-[indianred] text-[1.5rem]' />
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
