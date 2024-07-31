import classes from './Select.module.css';
const Select=(props)=>{
    return(
        <select name={props.name} className={classes.select} {...props.register(props.name)} required>
           <option disabled selected>Select {props.name}</option>
           {props.options.map(option=>{
             return  <option>{option}</option>
           })}
       </select>
    );
    
}

export default Select;