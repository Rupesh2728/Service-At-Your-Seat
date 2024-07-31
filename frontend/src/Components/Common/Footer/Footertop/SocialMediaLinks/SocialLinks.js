import classes from './SocialLinks.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter,faInstagram,faFacebookF,faYoutube,faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';

const SocialLinks=()=>{
    return (<Col lg={4} md={4}>
        <div className={classes.sociallinks}>
            <h4>Our Social Networks</h4>
              <div className={classes.socialmedialinks}>
                <Link to="#"><FontAwesomeIcon  icon={faTwitter} size="sm" style={{color: "#1DA1F2",}}/></Link>
                <Link to="#"><FontAwesomeIcon icon={faFacebookF} size="sm" style={{color: "#4267B2",}} /></Link>
                <Link to="#"><FontAwesomeIcon  icon={faInstagram} size="sm" style={{color: "#d62976",}}  /></Link>
                <Link to="#"><FontAwesomeIcon icon={faYoutube} size="sm" style={{color: "red",}}/></Link>
                <Link to="#"><FontAwesomeIcon  icon={faLinkedin} size="sm" style={{color: "#0A66C2",}}/></Link>
             </div>
         </div>
        </Col>);
}

export default SocialLinks;