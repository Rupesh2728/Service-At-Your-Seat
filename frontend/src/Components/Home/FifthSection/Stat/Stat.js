import classes from './Stat.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col} from 'react-bootstrap';

const Stat=(props)=>{
    return (
    <Col lg={3} md={6} sm={6} xs={6}> 
      <span className={classes.value}>{props.value}</span>
      <p className={classes.name} style={props.styleobj}>{props.name}</p>
    </Col>)
}

export default Stat;