import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import classes from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const SearchBar = ({ latestmovies, location }) => {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionList, setSuggestionList] = useState([]);

  useEffect(() => {

    let x = [];
    for (let i = 0; i < latestmovies.length; i++) {
      x[i] = latestmovies[i].MovieName;
    }
    setSuggestionList(x)



  }, [latestmovies]);


  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setSuggestions([]);
      return;
    }
    const newSuggestions = generateSuggestions(value);
    setSuggestions(newSuggestions);
  };

  const handleSearch = () => {
     
    let MovieDetails="";
    for (let i = 0; i < latestmovies.length; i++) {
      if(latestmovies[i].MovieName==searchTerm){
        MovieDetails=latestmovies[i];
      }
      
    }
    if(MovieDetails!="")
    navigate(`/User/IndividualPage?MovieDetails=${JSON.stringify(MovieDetails)}&city=${location}`);
    // console.log(`Searching for: ${searchTerm}`);
  };

  const handleSuggestionClick = (suggestion) => {
    // Set the clicked suggestion as the search term
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const generateSuggestions = (input) => {

    return suggestionList.filter(suggestion =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: 'center' }}>
        <div className={classes.searchbardiv}>
          <input type="text" placeholder="Search Your Movies Here..." className={classes.searchbar} value={searchTerm}
            onChange={handleInputChange} />
          <div className={classes.searchicon}>
            <FontAwesomeIcon icon={faSearch} size='xl' style={{ color: "#ff0000", }} onClick={handleSearch} />
          </div>

          {suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)} className={classes.searchbar}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}


        </div>
      </div>
    </Container>
  );
}

export default SearchBar;