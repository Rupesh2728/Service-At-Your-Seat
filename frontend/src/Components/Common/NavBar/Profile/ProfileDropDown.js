import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import profileimg from '../../../../Assests/NavBar/image.jpg';
import classes from './ProfileDropDown.module.css';
import { Link ,useNavigate} from 'react-router-dom';
import { useState,useEffect } from 'react';
import URL from '../../../../URL';


const ProfileDropDown=(props)=>{

  const [imageSrc, setImageSrc] = useState("https://png.pngtree.com/png-vector/20190501/ourmid/pngtree-users-icon-design-png-image_1014936.jpg");
  const navigate=useNavigate();
  const renderUserpic = async () => {
    // console.log("hi");
    const res = await fetch(URL+'/profile/profilepic', {
      method: 'get',
      headers: {
        "Content-Type": 'application/json'
      },
      credentials: 'include',
    });
    const blob = await res.blob();
    if (blob.size <= 3) {
      return;
    }
    const imageUrl = URL.createObjectURL(blob);
    setImageSrc(imageUrl);

  }
   
  useEffect(() => {
    renderUserpic();
  }, []);
  
   
  async function signout(){

   await fetch(URL+'/signout', {
    method: 'get',
    headers: {
      "Content-Type": 'application/json'
    },
    credentials: 'include',
  });
  
  navigate('/');

  }
  
      const styleobj1=props.flag==="M"?{backgroundColor:"black"}:{backgroundColor:"#181616",height:"3.5rem"};

     const styleobj2=props.flag==="M"?{marginTop:"1.5rem"}:{}               
    
    return ( <div className={classes.profilediv} style={styleobj2}>
        <Dropdown style={styleobj1}>   
           <Dropdown.Toggle id="dropdown-basic" variant='#181616' size='sm'>
              <img src={imageSrc} alt="mdo" className={classes.profile}/>
           </Dropdown.Toggle>
         
            <Dropdown.Menu>
              <Dropdown.Item><Link to="/User/Profile"><span className={classes.dropdownlist}>Profile</span></Link></Dropdown.Item>
              <Dropdown.Item><Link to="/User/RecentBookings"><span className={classes.dropdownlist}>Recent Booking</span></Link></Dropdown.Item>
              <Dropdown.Item><Link to="/User/EditProfile"><span className={classes.dropdownlist}>Change Passwords</span></Link></Dropdown.Item>
              <Dropdown.Divider/>
              {/* <Dropdown.Item><Link to="/"><span className={classes.dropdownlist}>Sign Out</span></Link></Dropdown.Item> */}
              <Dropdown.Item onClick={signout}><span className={classes.dropdownlist}>Sign Out</span></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </div>);
}

export default ProfileDropDown;