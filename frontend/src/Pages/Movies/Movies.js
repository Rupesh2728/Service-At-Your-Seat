import classes from './Movies.module.css';
import SearchBarFilters from '../../Components/Movies/SearchBarFilters/SearchBarFilters';
import NavBar from '../../Components/Common/NavBar/NavBar';
import MoviesSection from '../../Components/Movies/MoviesSection/MoviesSection';
import Footer from '../../Components/Common/Footer/Footer';
import { useState, useEffect } from 'react';
import URL from '../../URL';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../Login/Login';


const Movies = () => {
 
  const pageshift = useNavigate();
  const [Lfilter, setLfilter] = useState("ALL");  //state for filter show or hide
  const [Gfilter, setGfilter] = useState("ALL");  //state for filter show or hide
  const [LocFilter, setLocFilter] = useState("Vijayawada");
  function LfilterChange(data) {
    console.log(data);
    setLfilter(data);

  }

  function GfilterChange(data) {
    console.log(data);
    setGfilter(data);

  }


  const [LMoviesArray, setLMoviesArray] = useState([]);
  const [UMoviesArray, setUMoviesArray] = useState([]);
  const [ReviewArray, setReviewArray] = useState([]);
  const [location, setLocation] = useState("");

  function substringMatches(str, substr) {
    const regex = new RegExp(`^${substr}`, 'i');
    return regex.test(str);
  }

  async function renderData(DefLoc) {
    let response = await fetch(URL+"/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ location: DefLoc }),
      mode: 'cors',
      credentials: 'include'

    });

    let x = await response.json();
    if(x.result==="notloggedin")
    {
        pageshift('/login');
    }
    else
    {
      
    setLMoviesArray(x.latestmovies.filter((item) => {

      if (Lfilter === 'ALL' && Gfilter === 'ALL') {
        return true;
      } else if (Lfilter !== 'ALL' && Gfilter === "ALL") {
        return item.language === Lfilter;
      }
      else if (Lfilter === 'ALL' && Gfilter !== "ALL") {
        return substringMatches(Gfilter, item.genre);
      }
      else {
        return item.language === Lfilter && substringMatches(Gfilter, item.genre);
      }

    }));



    setUMoviesArray(x.upcomingmovies.filter((item) => {

      if (Lfilter === 'ALL' && Gfilter === 'ALL') {
        return true;
      } else if (Lfilter !== 'ALL' && Gfilter === "ALL") {
        return item.language === Lfilter;
      }
      else if (Lfilter === 'ALL' && Gfilter !== "ALL") {
        return substringMatches(Gfilter, item.genre);
      }
      else {
        return item.language === Lfilter && substringMatches(Gfilter, item.genre);
      }

    }))

    setReviewArray(x.reviewdata);
    setLocation(x.checklocaton);
    }

  }

  useEffect(() => {

    renderData(LocFilter);

  }, [Lfilter, Gfilter])

  useEffect(() => {
    
    renderData(LocFilter);
  }, [LocFilter])

     
  const Client = useSelector((state) => state.Client.value[0]);
  if(Client.Id===null || Client.Id===2)
  {
    return <Login/>;
  }

  return (
    <>
      <NavBar firstsection={SearchBarFilters} pagename="Movies" setLocFilter={setLocFilter} LocFilter={LocFilter} />
      <div className={classes.laptopfirstsection}>
        <SearchBarFilters LfilterChange={LfilterChange} GfilterChange={GfilterChange} latestmovies={LMoviesArray} location={location}/>
      </div>
      <MoviesSection title="Latest Movies" style={{}} Lfilter={Lfilter} Gfilter={Gfilter} MoviesArray={LMoviesArray} ReviewArray={ReviewArray} location={location} />
      <MoviesSection title="Upcoming Movies" style={{ marginTop: "4rem" }} Lfilter={Lfilter} Gfilter={Gfilter} MoviesArray={UMoviesArray} ReviewArray={ReviewArray} location={location} />
      <Footer />
    </>
  );
}

export default Movies;