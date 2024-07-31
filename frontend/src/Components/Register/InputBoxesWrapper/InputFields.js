import classes from './InputFields.module.css';
const InputFields=(props)=>{
  return (<div className={classes.fields}>{props.children}</div>);
}

export default InputFields;