import classes from './SideNavBar.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouseChimney,faFilm,faNewspaper,faUtensils,faGamepad,faCircleInfo,faAddressCard } from '@fortawesome/free-solid-svg-icons';
import MoviesNavExtraIcons from './MoviesExtraNavText/MoviesNavExtraIcons';
import SideNavIcon from './SideNavIcon/SideNavIcon';

const SideNavBar=(props)=>{
 return ( 
 <div className={classes.sidenavbar}>
    <Col lg={1}>
      <div className={classes.mobilenavcontent}>
       <SideNavIcon href="/" flag="0">
         <FontAwesomeIcon icon={faCircleInfo} size="lg" beat style={{color: "red",}} />       
       </SideNavIcon>

       {props.pagename==="Movies" && <MoviesNavExtraIcons/>}

        <SideNavIcon href="/" flag="1">
          <FontAwesomeIcon icon={faHouseChimney} size="lg" style={{color: "grey",}} />       
         </SideNavIcon>


       <SideNavIcon href="/" flag="1">
         <FontAwesomeIcon icon={faFilm} size="lg" style={{color: "#9b0d0d",}} />       
       </SideNavIcon>

       <SideNavIcon href="/" flag="1">
          <FontAwesomeIcon icon={faUtensils} size="lg" style={{color: "#C0C0C0",}} />       
       </SideNavIcon>

       <SideNavIcon href="/" flag="1">
         <FontAwesomeIcon icon={faNewspaper} size="lg" style={{color: "white",}} />        
       </SideNavIcon>

       <SideNavIcon href="/" flag="0">
       <FontAwesomeIcon icon={faGamepad} size="lg" style={{color: "green",}} />      
       </SideNavIcon>

       <SideNavIcon href="/" flag="0">
       <FontAwesomeIcon icon={faAddressCard} size="lg" style={{color: "#3c64dd",}} />
       </SideNavIcon>
      </div>
    </Col>
</div>)
}

export default SideNavBar;