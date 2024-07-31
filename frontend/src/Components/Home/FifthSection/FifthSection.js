import classes from './FifthSection.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Title from './Title/Title';
import Stat from './Stat/Stat';


const FifthSection=()=>{
   return (
   <section className={classes.counts}>
    <Container>
     <Title/>
       <div className={classes.statsdiv}>
         <Row>
            <Stat value={1143} name="Clients" styleobj={{marginLeft:"1.5rem"}}/>
            <Stat value={999} name="Number of Transactions made" styleobj={{}}/>
            <Stat value={4.0} name="Client Review" styleobj={{}}/>
            <Stat value="75%" name="Website Support" styleobj={{}}/>
       </Row>
    </div>
  
     </Container>

 </section>);
}

export default FifthSection;