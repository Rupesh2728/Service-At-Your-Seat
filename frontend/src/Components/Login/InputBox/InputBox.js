import { faEnvelope,faVoicemail,faLock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './InputBox.module.css';
const Inputbox=(props)=>{
    let ipLabel;
    let faIcon;
    if(props.type==="email")
      {
        faIcon=faEnvelope;
        ipLabel="Email";
      }
    else if(props.type==="password")
      {
        faIcon=faLock;
        ipLabel="Password";
      }
    else
     {
        faIcon=faVoicemail; 
        ipLabel="Theatre License";
     }   
  
    return(
      <div className={classes.inputbox}>
         <span className={classes.icon}>
           <FontAwesomeIcon icon={faIcon} size='sm' style={{color: "#ffffff",}} />
         </span>
         <input type={props.type} name={props.type} autoComplete="off" required {...(props.register)(props.type, { required: `${props.type} is required` })}/>
         <label>{ipLabel}</label>
      </div>
      );
}

export default Inputbox;