import classes from './SearchDiv.module.css';
const SearchDiv=(props)=>{
  return (<div className={classes.mainsearchdiv}>{props.children}</div>);
}

export default SearchDiv;