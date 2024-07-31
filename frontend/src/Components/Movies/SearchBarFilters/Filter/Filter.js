import classes from './Filter.module.css';
const Filter = (props) => {

  function onchange(e) {
    // console.log(e.target.value);
    props.onchange(e.target.value);
  }

  return (
    <>
      <label className={classes.label}>{props.label} :</label>
      <select className={classes.select} onChange={onchange}>
        <option value="All" className={classes.option}>All</option>
        {props.options.map(option => {
          return <option value={option} className={classes.option}>{option}</option>
        })}
      </select>
    </>);
}

export default Filter;