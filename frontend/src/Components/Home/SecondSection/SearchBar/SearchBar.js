import classes from './SearchBar.module.css';
const SearchBar=({setTname,Tname})=>{
    return (
        <div className={classes.searchbardiv}>
           <input type='search' className={classes.searchbar} value={Tname} placeholder='Enter the Theatre Name' onChange={(e)=>setTname(e.target.value)}/> 
        </div>
    );
}

export default SearchBar;