import classes from './Logos.module.css';
const Logos=(props)=>{
    return (<div className={classes.logodiv}>{props.children}</div>);
}

export default Logos;