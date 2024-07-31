import classes from './LaptopNavBar.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row } from 'react-bootstrap';
import mainlogo from '../../../../Assests/finalmainlogo.png';
import MainNavBar from './MainNavBar/MainNavBar';
import Location from '../../Location/Location';

const LaptopNavBar = (props) => {
  return (<>
    <div className={classes.laptopnavbar}>
      <Row>
        <Col lg={3}>
          <img src={mainlogo} alt="SAYS" className={classes.sayslogo} />
        </Col>

        <Col lg={6}>
          <MainNavBar />
        </Col>

        <Col lg={2}>
          {props.pagename === "Movies" &&
            <div className={classes.locdiv}>
              <Location styleobj={{ fontSize: "1.4vw" }} showcity={true} setloc={props.setLocFilter} loc={props.LocFilter} />
            </div>}
        </Col>

        <Col lg={1}>
          {props.pagename === "Movies" &&

            <p className={classes.calenderdiv}>
              <input type='date' className={classes.calender} />
            </p>
          }
        </Col>
      </Row>
    </div>
  </>)
}

export default LaptopNavBar;