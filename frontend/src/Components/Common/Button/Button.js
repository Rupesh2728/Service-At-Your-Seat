import classes from './Button.module.css';
const Button=(props)=>{
    
   return (<button  type={props.type} className={classes.btn} style={props.style}>{props.name}</button>);
}
export default Button;