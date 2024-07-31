import classes from './LocationIcon.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const LocationIcon=()=>{
  return (<p className={classes.locicon}><FontAwesomeIcon icon={faLocationDot} style={{color: "#ff0000",}} /></p>)
}

export default LocationIcon;