import classes from './Title.module.css';
const Title=(props)=>{
  return (<span className={classes.title}>{props.title}</span>);
}

export default Title;