
import LaptopNavBar from '../NavBar/LaptopNavBar/LaptopNavBar';
import MobileNavBar from '../NavBar/MobileNavBar/MobileNavBar';
import SlideNavBar from './SlideNavBar/SlideNavBar';
import classes from './NavBar.module.css';

const NavBar=({firstsection:FirstSection,pagename,setLocFilter,LocFilter})=>{
    return (
        <>       
         <div className={classes.laptopNavBar}>
           <LaptopNavBar pagename={pagename} setLocFilter={setLocFilter} LocFilter={LocFilter}/>
          </div>
        {/* <div className={classes.mobileNavBar}>
          <MobileNavBar firstsection={FirstSection} pagename={pagename}/>
        </div>

        <div className={classes.slidenavbar}>
          <SlideNavBar firstsection={FirstSection} pagename={pagename}/>
        </div> */}

        </>
    );
}

export default NavBar;