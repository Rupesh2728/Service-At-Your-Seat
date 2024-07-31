import classes from './Header.module.css';
const Header=(props)=>{
    return ( <header className={classes.header}>{props.headervalue}</header>);
}

export default Header;