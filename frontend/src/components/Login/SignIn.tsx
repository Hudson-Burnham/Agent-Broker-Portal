import { LoadingButton } from "@mui/lab";
import {
  IconButton,
  InputAdornment,
  Typography,
  styled,
} from "@mui/material";
import Form from "../Form/Form";
import TextInput from "../Form/TextInput";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { loginRequest } from "../../axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/action";
import ChangePassword from "./ChangePassword";
import AlertContainer from "./AlertContainer";
import axios from "axios";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  textAlign: "center",
  boxShadow: "20px 20px 60px #c4c4c4",
  height: "100%",
  justifyContent: "center",
  background: "#131E30",
  position: "relative",
});

export const LoginBox = styled("div")({
  maxWidth: "360px",
  color: "#ffffff",
});

export const MainButton = styled(LoadingButton)({
  width: "100%",
  textTransform: "none",
  color: "white",
  padding: "12px",
  background: "#A29181",
  ":hover": {
    background: "#A29181",
    color: "white",
  },
});
export const SecondaryButton = styled(LoadingButton)({
  width: "100%",
  padding: "12px",
  textTransform: "none",
  background: "#d5d5d5",
  color: "#131E30",
  ":hover": {
    background: "#d5d5d5",
  },
});

interface Props {
  handleLogin: () => void;
}

type FormProps = {
  email: string;
  password: string;
};
function SignIn(props: Props) {
  const dispatch = useDispatch();
  const [showPassword, handleShowPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [showAlert, setShowAlert] = useState(0);
  const [alertText, setAlertText] = useState("");

  const defaultValues = {
    email: "",
    password: "",
  };
  const LoginSchema = Yup.object().shape({
    email: Yup.string().trim().email().required("Email is required"),
    password: Yup.string()
      .trim()
      .required("Password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special character."
      ),
  });
  const methods = useForm<FormProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: FormProps) => {
    setShowAlert(0);
    try {
      await loginRequest(data).then((res) => {
        if (res.data?.error) {
          console.log("login error");
          setShowAlert(-1);
          setAlertText(res.data.error);
        } else {
          const accessToken = res.data.accessToken
          const user = {
            _id: res.data.user._id,
            username: res.data.user.username,
            email: res.data.user.email,
            firstLogin: res.data.user.firstLogin,
          };
          console.log("access token", accessToken)
          localStorage.setItem("access_token", res.data.accessToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`
          dispatch(login(user));
          setShowAlert(1);
          setAlertText(`Hi ${user.username}!, Welcome to Agent Broker Portal`);
        }
      });
    } catch (error) {
      console.log("error");
      setAlertText("Encountered some error. Please retry after some time...");
      setShowAlert(-1);
      reset();
    }
  };

  return (
    <Container>
      {showAlert !== 0 && <AlertContainer alertText={alertText} showAlert={showAlert} setShowAlert={setShowAlert} />}
      {changePassword ? (
        <ChangePassword setValue={setChangePassword} setAlertText={setAlertText} setShowAlert={setShowAlert} />
      ) : ( 
        <LoginBox>
          <Typography variant="h5" fontWeight={800} mb={0.5} align="left">
            Welcome Back
          </Typography>
          <Typography variant="subtitle1" mb={3} align="left">
            Have we met before?
          </Typography>

          <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="email"
              type="email"
              label="Email"
              value="sharmasantushti1012@gmail.com"
              placeholder="Enter your email"
            />
            <TextInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value="Santushti@1012"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    sx={{ p: 0 }}
                    onClick={() => handleShowPassword((val) => !val)}
                  >
                    {showPassword ? (
                      <VisibilityOff style={{ color: "white" }} />
                    ) : (
                      <Visibility style={{ color: "white" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <MainButton variant="contained" style={{marginTop: "24px"}} type="submit">
              Log In
            </MainButton>
          </Form>
          <Typography
            variant="body2"
            fontWeight={700}
            style={{ cursor: "pointer" }}
            mt={2}
            onClick={() => {
              setShowAlert(0)
              setChangePassword((prev) => !prev)
            }}
          >
            Forgot your password ?
          </Typography>

          <Typography variant="body1" mt={4} color={"#ffffff66"}>
            New to our platform ?{" "}
            <a
              style={{
                fontWeight: 700,
                textDecoration: "underline",
                cursor: "pointer",
                color: "#ffffff",
              }}
              onClick={props.handleLogin}
            >
              Sign Up
            </a>
          </Typography>
        </LoginBox>
      )}
    </Container>
  );
}

export default SignIn;