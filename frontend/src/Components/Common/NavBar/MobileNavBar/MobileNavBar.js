import 'bootstrap/dist/css/bootstrap.css';
import {Row } from 'react-bootstrap';
import TopNavBar from './TopNavBar/TopNavBar';
import SideNavBar from './SideNavBar/SideNavBar';

const MobileNavBar=({firstsection: FirstSection,pagename})=>{
return(
   <div>
       <TopNavBar/>
       <Row>
           <SideNavBar pagename={pagename}/>

          <div>
            <FirstSection/>
          </div>
       </Row>
    </div>
);
}

export default MobileNavBar;