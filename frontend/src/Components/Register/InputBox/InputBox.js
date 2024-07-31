import ErrorMsg from '../ErrorMsg/ErrorMsg';
import Input from '../InputTypes/Input/Input';
import classes from './InputBox.module.css';
import Select from '../InputTypes/Select/Select';
const InputBox = (props) => {
  return (
    <div className={classes.inputfield}>
      <label>{props.label}</label>
      {props.type !== "select" &&
        <Input type={props.type} placeholder={props.placeholder} name={props.name} register={props.register} />}
      {props.type === "select" && <Select name={props.name} options={props.options} register={props.register}/>}
      {/* <ErrorMsg errmsg="show error"/> */}
    </div>
  )
}

export default InputBox;