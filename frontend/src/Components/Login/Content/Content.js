import classes from './Content.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTwitter,faInstagram,faFacebookF,faYoutube} from '@fortawesome/free-brands-svg-icons'
import logo from '../../../Assests/finalmainlogo.png'

const Content=()=>{
    return (
    <div className={classes.content}>
      
       <div className={classes.logo}>
       <img alt='Main_Logo' src={logo}/>
       </div>

       <div className={classes.textcontent}>
        <h2>Welcome <span>To our Website.</span></h2>
        <p>We are at your Service</p>
        </div>


        <div className={classes.socialicon}>
          <a href="/" className='fb'><FontAwesomeIcon icon={faFacebookF} size="lg" style={{color: "#4267B2",}} /></a>
          <a href="/" className='insta'><FontAwesomeIcon  icon={faInstagram} size="lg" style={{color: "#d62976",}}  /></a>
          <a href="/" className='twit'><FontAwesomeIcon  icon={faTwitter} size="lg" style={{color: "#1DA1F2",}}/></a>
          <a href="/" className='yt'><FontAwesomeIcon icon={faYoutube} size="lg" style={{color: "red",}}/></a>
        </div>
    </div>);
}

export default Content;