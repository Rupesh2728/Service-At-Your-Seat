import { Link } from 'react-router-dom';
import classes from './LoginRegister.module.css';
import { useDispatch } from 'react-redux';
import { update } from '../../../ReduxStores/LoginRedux';
const LoginRegister=(props)=>{   
    const name=props.type==="User"?"User":"Theatre";
     

    let dispatch=useDispatch();
     function updateClient(){
      
     let y= name==="User"?"Theatre":"User";
      
    

     dispatch(update([{
     client:y
     }]))

  

     }
     

    return (<div className={classes.loginregister}>
        
        <p className={classes.clientregister}>New {name}? 
           <Link to={props.type==="User"?"/User/Registor":"/Theatre/Registor"}>
              Register
           </Link>
        </p>

        
        <p className={classes.userlogin} onClick={updateClient}>{name==="User"?"Theatre":"User"} Login?</p>
        

        <p className={classes.login_success}>
         {props.error}
        </p>
      </div>);
}
//
export default LoginRegister;