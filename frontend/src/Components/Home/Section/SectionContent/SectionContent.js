import { Link } from 'react-router-dom';
import classes from './SectionContent.module.css';
import SecSubTitle from './SubTitle/SecSubTitle';
import SecTitle from './Title/SecTitle';
const SectionContent=(props)=>{
  return ( 
  <div className={classes.firstseccontent}>
     <SecTitle title={props.title}/>
     <SecSubTitle subtitle={props.subtitle}/>
     {props.landingpage===true && <Link to="/login"><button className={classes.booknowbtn}>{props.btnname}</button></Link>}
     {props.landingpage===false && <Link to={props.btnhref}><button className={classes.booknowbtn}>{props.btnname}</button></Link>}
    
  </div>
  )
}

export default SectionContent;