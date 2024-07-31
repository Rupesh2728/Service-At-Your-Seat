import classes from './SelectedLocName.module.css';
const SelectedLocName=(props)=>{
   return (<p className={classes.mainlocname} style={props.styleobj}>{props.locname}</p>);
}
export default SelectedLocName;