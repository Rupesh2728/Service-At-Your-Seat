import classes from './RegForm.module.css';
import Button from '../../Common/Button/Button';
import UserRegistration from '../UserRegistration';
import TheatreRegistration from '../TheatreRegistration';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import URL from '../../../URL';


const RegForm = (props) => {

    const { handleSubmit, register } = useForm();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    async function onSubmit(data) {
        // console.log(data);

        let api = "";
        if (props.type === "user") {
            api = "Signup";
        }
        else {
            api = "TSignup";
        }
        // console.log(api);
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
        switch (output) {
            case "/login":
                navigate('/login');
                break;

            default:
                setError(output);
        }

    }

    return (
        <form action={props.action} method={props.method} className={classes.regForm} onSubmit={handleSubmit(onSubmit)}>
            {props.type === "user" && <UserRegistration register={register} />}
            {props.type === "theatre" && <TheatreRegistration register={register} />}
            <div className={classes.endingdiv}>
                <Button type="submit" name="Submit" style={{ color: "#fff", backgroundColor: "#4070f4", fontSize: "14px", fontWeight: 500, maxWidth: "200px", marginTop: "2vw" }} />
                <p style={{ color: 'red', paddingTop: '39px', fontSize: 'large' }}>{error}</p>

            </div>

        </form>);
}

export default RegForm;