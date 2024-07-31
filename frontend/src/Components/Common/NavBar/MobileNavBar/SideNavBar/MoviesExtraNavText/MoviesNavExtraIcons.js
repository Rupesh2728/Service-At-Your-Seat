import classes from './MoviesNavExtraIcons.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import LocDropDown from '../../../../Location/LocDropDown/LocDropDown';
const MoviesNavExtraIcons=()=>{
   return (<>
      <p className={classes.moviesnavtext}>
        <FontAwesomeIcon icon={faLocationDot} style={{color: "#ff0000",}} size='xl'/>
          <LocDropDown showcity={false} styleobj={{}}/>
         
         {/* Second section location drop down should be attached here */}
      </p>

      <p className={classes.moviesnavtext}>
        <input type='date' className={classes.calender}/>    
      </p> 
   </>)
}

export default MoviesNavExtraIcons;