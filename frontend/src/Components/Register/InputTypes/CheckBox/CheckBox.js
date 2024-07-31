import classes from './CheckBox.module.css';
const CheckBox=(props)=>{

    const ChangeHandler=(e)=>{
        props.Checked(e.target.checked);
    }

    return (<div className={classes.inputfield}>
    <input type="checkbox" name={props.name} className={classes.input} onChange={ChangeHandler}/>
    <label className={classes.label}>{props.label}</label>
    </div>)
}

export default CheckBox;