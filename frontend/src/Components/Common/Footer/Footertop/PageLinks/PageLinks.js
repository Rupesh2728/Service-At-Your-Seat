import classes from './PageLinks.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PageLinks=()=>{
 return (<Col lg={4} md={4} xs={6}>
    <div className={classes.footerlinks}>
       <h4>Useful Links</h4>
       <ul>
         <li><FontAwesomeIcon icon={faChevronRight} style={{color: "#49b5e7",}} /> <Link to="/User/HomePage">Home</Link></li>
         <li><FontAwesomeIcon icon={faChevronRight} style={{color: "#49b5e7",}} /> <Link to="/User/MoviesPage">Movies</Link></li>
         <li><FontAwesomeIcon icon={faChevronRight} style={{color: "#49b5e7",}} /> <Link to="/User/SnacksPage">Snacks</Link></li>
         <li><FontAwesomeIcon icon={faChevronRight} style={{color: "#49b5e7",}} /> <Link to="/User/News">News</Link></li>
         <li><FontAwesomeIcon icon={faChevronRight} style={{color: "#49b5e7",}} /> <Link to="/User/Aboutus">About Us</Link></li>
         <li><FontAwesomeIcon icon={faChevronRight} style={{color: "#49b5e7",}} /> <Link to="/User/Contactus">Contact Us</Link></li>
       </ul>
    </div>
  </Col>);
}

export default PageLinks;