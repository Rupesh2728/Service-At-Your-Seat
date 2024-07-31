import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import classes from './FourthSection.module.css';
import Topclients from './TopClients';
import Title from './Title/Title';
import Logos from './Wrapper/Logos';
import Logo from './Logo/Logo';

const FourthSection=()=>{
  

  
  
  
  return (
  <section className={classes.topclients}>
     <Container>
        <Title/>
          
        <Logos>
          <Row>
             {Topclients.map(client=>{
                return (
                  <Col lg={3} md={4} sm={4} xs={4}>
                    <Logo src={client.imglink}/>
                  </Col>)
               })}
           </Row>
        </Logos>
    
    </Container>

  </section>)
}

export default FourthSection;