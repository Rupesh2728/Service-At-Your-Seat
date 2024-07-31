import classes from './Section.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import SectionContent from './SectionContent/SectionContent';
import CustomCarousel from './Carousel/Carousel';


const Section=(props)=>{
  return (
   <div className={classes.style}>
      <section className={classes.section}>
     <Container>
        <div className={classes.secrow}>
          <Row>
             <Col 
             lg={props.responsiveobj.content.lg} 
             md={props.responsiveobj.content.md} 
             sm={props.responsiveobj.content.sm} 
             xs={props.responsiveobj.content.xs}
             >
              
                <SectionContent
                  title={props.content.title} 
                  subtitle={props.content.subtitle} 
                  btnname={props.content.btnname} 
                  btnhref={props.content.btnhref} 
                  landingpage={props.landingpage}
               />
          
             </Col>
 
             <Col 
              lg={props.responsiveobj.carousel.lg} 
              md={props.responsiveobj.carousel.md} 
              sm={props.responsiveobj.carousel.sm} 
              xs={props.responsiveobj.carousel.xs}
              >
                <CustomCarousel imgobjarr={props.imgobjarr} controls={false} indicators={false}/>
              </Col>
        </Row>
       </div>
    </Container>
 </section>

   </div>
  
 );
}

export default Section;