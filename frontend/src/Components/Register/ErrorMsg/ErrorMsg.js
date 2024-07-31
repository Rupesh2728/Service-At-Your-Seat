import classes from './ErrorMsg.module.css';
const ErrorMsg=(props)=>{
    return ( 
     <span className={classes.errormsg}>
       {props.errmsg}
     </span>
     )
}

export default ErrorMsg;