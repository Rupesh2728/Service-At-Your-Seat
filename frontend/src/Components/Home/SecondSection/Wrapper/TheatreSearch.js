import classes from './TheatreSearch.module.css';
const TheatreSearch=(props)=>{
    return (<section className={classes.theatresearch}>{props.children}</section>);
}

export default TheatreSearch;