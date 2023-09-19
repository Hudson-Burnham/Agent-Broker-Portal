import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Typography, styled } from "@mui/material";
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

});
export const AlertBox = styled("div")({
  minHeight: "80px",
});
export const LoginBox = styled("div")({
  maxWidth: "360px",
  color:'#ffffff'
});

export const MainButton = styled(LoadingButton)({
  width: "100%",
  textTransform: "none",
  color: 'white',
  padding: '12px',
  background: '#A29181',
  ":hover": {
  background: '#A29181',
  color: 'white'
  },
});
export const SecondaryButton = styled(LoadingButton)({
  width: "100%",
  padding: '12px',
  textTransform: "none",
  background: '#d5d5d5',
  color: "#131E30",
  ":hover": {
  background: '#d5d5d5',

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
    try {
      await loginRequest(data)
        .then((res) => {
          const user = {
            _id: res.data._id,
            username: res.data.username,
            email: res.data.email,
            firstLogin: res.data.firstLogin
          };
          dispatch(login(user));
        })
        .catch((err) => console.log("Login error: ", err));
    } catch (error) {
      console.log("error");
      reset();
    }
  };

  return (
    <Container>
      <AlertBox></AlertBox>
      {changePassword ? (
        <ChangePassword setValue={setChangePassword} />
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
              placeholder="Enter your email"
            />
            <TextInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
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
            <MainButton variant="contained" type="submit">
              Log In
            </MainButton>
          </Form>
          <Typography
            variant="body2"
            fontWeight={700}
            style={{ cursor: "pointer" }}
            mt={2}
            onClick={() => setChangePassword((prev) => !prev)}
          >
            Forgot your password ?
          </Typography>

          <Typography variant="body1" mt={4} color={'#ffffff66'}>
            New to our platform ?{" "}
            <a
              style={{
                fontWeight: 700,
                textDecoration: "underline",
                cursor: "pointer",
                color: '#ffffff'
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