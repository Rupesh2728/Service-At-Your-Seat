import classes from './Filters.module.css';
import Filter from "../Filter/Filter";
const Filters = (props) => {
  return (
    <div className={classes.filtersdiv}>
      <div className={classes.langfilter}>
        <Filter options={["Telugu", "Hindi", "Tamil", "English"]} label="Language" onchange={props.LfilterChange}/>
      </div>
      <div className={classes.genrefilter}>
        <Filter options={["Horror", "Comedy", "Thriller", "Action"]} label="Film Genre" onchange={props.GfilterChange} />
      </div>
    </div>
  );
}

export default Filters;