import classes from './SecTitle.module.css';
const SecTitle=(props)=>{
   return (<h1 className={classes.title}>{props.title}</h1>)
}

export default SecTitle;