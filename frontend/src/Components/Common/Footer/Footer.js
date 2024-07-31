import classes from './Footer.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Row,Container } from 'react-bootstrap';
import Copyright from './FooterBottom/Copyright/Copyright';
import FooterTop from './Footertop/FooterTop';
import FooterContact from './Footertop/FooterContact/FooterContact';
import PageLinks from './Footertop/PageLinks/PageLinks';
import SocialLinks from './Footertop/SocialMediaLinks/SocialLinks';

const Footer=()=>{
    return (
     <footer className={classes.footer}>  
      <FooterTop>
        <Container>
           <Row>
              <FooterContact/>
              <PageLinks/>
              <SocialLinks/>
           </Row>
      </Container>
      </FooterTop>
    <Copyright/>   
   </footer>
    );
}

export default Footer;