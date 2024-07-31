import classes from './ForgotPassword.module.css';
const ForgotPassword=()=>{
    return (
    <div className={classes.forgotpassword}>
        <label><input type="checkbox"/>Remember me</label>
           {/* <a href="#">Forget password</a> */}
     </div>
);
}

export default ForgotPassword;