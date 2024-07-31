import classes from './Location.module.css';
import LocationIcon from './LocationIcon/LocationIcon';
import LocDropDown from './LocDropDown/LocDropDown';

const Location=(props)=>{
  
  return (
    <div className={classes.locationdiv} style={props.styleobj}>
        <LocationIcon/>
        <LocDropDown styleobj={props.styleobj} showcity={props.showcity} setloc={props.setloc} loc={props.loc} />
   </div>
  )
}

export default Location;