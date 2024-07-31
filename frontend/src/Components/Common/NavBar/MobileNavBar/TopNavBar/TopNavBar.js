import classes from './TopNavBar.module.css';
import ProfileNavBarDiv from './ProfileNavBarDiv/ProfileNavBarDiv';
import MainLogo from '../MainLogo/MainLogo';
const TopNavBar=()=>{
   return ( 
     <div className={classes.topdiv}>
         <MainLogo/>
         <ProfileNavBarDiv/>
    </div>
  );
}

export default TopNavBar;