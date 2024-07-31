import NavBar from "../../Components/Common/NavBar/NavBar";
import FifthSection from "../../Components/Home/FifthSection/FifthSection";
import FirstSection from "../../Components/Home/FirstSection/FirstSection";
import FourthSection from "../../Components/Home/FourthSection/FourthSection";
import classes from './Home.module.css'
import ThirdSection from "../../Components/Home/ThirdSection/ThirdSection";
import Footer from '../../Components/Common/Footer/Footer'
import SecondSection from "../../Components/Home/SecondSection/SecondSection";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

const Home=()=>{
    return (<div>
      <NavBar firstsection={FirstSection} pagename="Home"/>
     <Container>
     <div className={classes.laptopfirstsection}>
       <FirstSection landingpage={false}/>
     </div>
       <div className={classes.fline}></div>
       <SecondSection/>
       <div className={classes.line}></div>
       <ThirdSection landingpage={false}/>
       <div className={classes.line}></div>
       <FourthSection/>
       <FifthSection/>
      </Container>  
        <Footer/>
    </div>);
}

export default Home;