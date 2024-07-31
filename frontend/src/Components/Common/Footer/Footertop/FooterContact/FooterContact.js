import 'bootstrap/dist/css/bootstrap.css';
import { Col } from 'react-bootstrap';
import classes from './FooterContact.module.css';
const FooterContact=()=>{
 return (
    <Col lg={4} md={4} xs={6}>
       <div className={classes.footercontact}>
          <h3>Service At Your Seat</h3>
             <p>
              IIIT Sricity <br/>
              Sricity,517646,Andhra Pradesh<br/>
              India <br/><br/>
              <strong>Phone:</strong> +91 6388557545<br/>
              <strong>Email:</strong> SAYS@gmail.com<br/>
            </p>
        </div>
    </Col>
 );
}

export default FooterContact;