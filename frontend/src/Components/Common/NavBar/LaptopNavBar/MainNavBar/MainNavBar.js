import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import classes from './MainNavBar.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import ProfileDropDown from '../../Profile/ProfileDropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const MainNavBar=()=>{
    return (<div className={classes.mainnavbar}>
        <Navbar expand="lg" className="border-left-2">
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbar-nav" style={{width:"42vw"}}>
          <Nav>
                <Link to='/User/HomePage'><span className={`${classes.navtext} ml-1 mr-3`} ><FontAwesomeIcon icon={faHouseChimney} style={{color: "#ffd700",}} /></span></Link> 
                <Link to='/User/MoviesPage'><span className={`${classes.navtext} mr-3`}>Movies</span></Link>  
                <Link to='/User/SnacksPage'><span className={`${classes.navtext} mr-3`}>Snacks</span></Link>  
                <Link to='/User/News'><span className={`${classes.navtext} mr-3`}>News</span></Link>   
                <Link to='/User/Aboutus'><span className={`${classes.navtext} mr-3`}>About</span></Link>
                <Link to='/user/contactus'><span className={`${classes.navtext} mr-3`}>ContactUs</span></Link>
          </Nav>     
      </Navbar.Collapse>

             <ProfileDropDown flag="L"/>
         </Navbar>
  </div>);
}

export default MainNavBar;