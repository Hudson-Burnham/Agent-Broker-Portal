import { useState } from "react";
import SignIn from "../components/Login/SignIn";
import SignUp from "../components/Login/SignUp";
import { styled } from "@mui/material";
import loginBG from "../login-bg.png"

const Container = styled('div')({
  display: 'grid',
  gridTemplateColumns: '40% 60%',
  backgroundColor: '#191933',
  height: '100vh',
  alignItems: 'center'
})
const LoginBG = styled('div') ({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  padding: '0 64px',
})

function Login() {
  const [signIn, setSignIn] = useState(true);
  const handleLogin = () => {
    setSignIn((signIn) => !signIn);
  };

  return (
    <Container>
      {signIn ? (
        <SignIn handleLogin={handleLogin} />
      ) : (
        <SignUp handleLogin={handleLogin} />
      )}
      <LoginBG>
        <img src={loginBG} width={'100%'} />
      </LoginBG>
    </Container>
  );
}

export default Login;