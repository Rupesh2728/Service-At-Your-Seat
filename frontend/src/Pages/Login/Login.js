import Background from '../../Components/Login/Background/Background';
import Container from '../../Components/Login/Container/Container';
import Content from '../../Components/Login/Content/Content';
import LoginForm from '../../Components/Login/LoginForm/LoginForm';
import {  useSelector } from 'react-redux';
//Try to use common btn for register and login

const Login=(props)=>{

  const Client = useSelector((state) => state.Client.value);
   
  console.log(Client);

  return(<>
  <Background/>
   <Container>
    <Content/>
    <LoginForm type={Client[0].client}/>
   </Container>
  </>);

  
}
export default Login;