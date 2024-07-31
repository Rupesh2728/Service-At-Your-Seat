import classes from './ProfileNavBarDiv.module.css';
import ProfileDropDown from '../../../Profile/ProfileDropDown';
const ProfileNavBarDiv=()=>{
   return (
    <div className={classes.profilenavbardiv}>
       <span className={classes.profilenavtext}>Movie Mania</span>
       <span className={classes.profilenavtext}>About</span>
       <span className={classes.profilenavtext}>Contact Us</span>
       <ProfileDropDown flag="M"/>
   </div>);
}

export default ProfileNavBarDiv;