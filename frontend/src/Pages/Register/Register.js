import RegForm from '../../Components/Register/RegForm/RegForm';
import Container from '../../Components/Register/Container/Container';
import Header from '../../Components/Register/Header/Header';
import classes from './Register.module.css';


const Register = (props) => {



  return (<div className={classes.style}>
    <Container>
      <Header headervalue="Registration" />
      <RegForm action={props.action} method={props.method} type={props.type} />
    </Container>
  </div>);
}

export default Register;