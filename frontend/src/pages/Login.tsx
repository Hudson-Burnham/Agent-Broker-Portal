import { useState } from "react";
import SignIn from "../components/Login/SignIn";
import SignUp from "../components/Login/SignUp";

interface Props  {
  setAuth: () => void
}
function Login(props: Props) {
  const [signIn, setSignIn] = useState(true);
  const handleLogin = () => {
    setSignIn((signIn) => !signIn);
  };

  return (
    <>
      {signIn ? (
        <SignIn setAuth={props.setAuth} handleLogin={handleLogin} />
      ) : (
        <SignUp handleLogin={handleLogin} />
      )}
    </>
  );
}

export default Login;
