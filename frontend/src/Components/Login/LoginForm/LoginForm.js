import classes from './LoginForm.module.css';
import Inputbox from '../InputBox/InputBox';
import Button from '../../Common/Button/Button';
import LoginRegister from '../LoginRegister/LoginRegister';
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { ref } from '../../../ReduxStores/LoginRedux';
import URL from '../../../URL';




const LoginForm = (props) => {

  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();


  const [Formheading, setFormheading] = useState("");
  const [inputs, setInputs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormheading(props.type === "User" ? "Sign In" : "TSign In")
    setInputs(props.type === "User" ? ["email", "password"] : ["email", "License", "password"])
  }, [props]);



  let dispatch = useDispatch();



  const onSubmit = async (data) => {
    // console.log(data);
    let api = "";
    if (props.type === "User") {
      api = "login";
    }
    else {
      api = "Tlogin";
    }
    let response = await fetch(URL+"/" + api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include', // <-- Important
    });

    const output = await response.json();
    console.log(output);

    switch (output.result) {
      case "home":
        dispatch(ref([{
          Id:output.UserReferenceNumber,
          City:""
          }]))    
        navigate("/User/HomePage")
        break;

      case "theatre":
        dispatch(ref([{
          Id:output.currtheatrereffnum,
          City:output.currtheatrecity
          }])) 
        navigate("/Theatre/Theatredashboard")
        break;

      case "adminhome":
        console.log("hi ra tester");
        navigate("/Admin")
        break;

      case "error":
        setError("Incorrect Credintials");
    }


  };



  return (
    <div className={classes.loginbox}>
      <div className={classes.formbox}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{Formheading}</h2>
          {inputs.map((item, index) => (
            <Inputbox
              key={index}
              type={item}
              register={register}
            />
          ))}
          <ForgotPassword />
          <Button
            type="submit"
            name="Sign In"
            style={{ color: "#e4e4e4", backgroundColor: "#c4103d", fontSize: "16px", fontWeight: 400 }}

          />


          <LoginRegister type={props.type} error={error} />
        </form>

      </div>
    </div>);
}

export default LoginForm;
