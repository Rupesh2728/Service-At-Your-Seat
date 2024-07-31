
import Filters from "./Filtersdiv/Filters";
import SearchBar from "./SearchBar/SearchBar";
import Slogan from "./Slogan/Slogan";

const SearchBarFilters=({LfilterChange,GfilterChange,latestmovies,location})=>{
    return ( <>  
      <Slogan/>
     <SearchBar latestmovies={latestmovies} location={location}/>
      <Filters LfilterChange={LfilterChange} GfilterChange={GfilterChange}/>
    </>);
}

export default SearchBarFilters;