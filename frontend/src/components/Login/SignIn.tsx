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

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  textAlign: "center",
  background: "#1c1c38",
  boxShadow: "20px 20px 60px #0e0e1d",
  height: "100%",
  justifyContent: "center",
});
export const AlertBox = styled("div")({
  minHeight: "80px",
});
export const LoginBox = styled("div")({
  maxWidth: "360px",
  color: "white",
});

export const MainButton = styled(LoadingButton)({
  width: "100%",
  background: "linear-gradient(145deg, #4646d3, #5353fa)",
  boxShadow: "20px 20px 38px  #15152a, -20px -20px 38px  #232346",
  padding: "8px 12px",
  borderRadius: "24px",
  textTransform: "none",
  ":hover": {
    background: "linear-gradient(145deg, #4646d3, #5353fa)",
    boxShadow: "20px 20px 38px  #15152a, -20px -20px 38px  #232346",
  },
});
export const SecondaryButton = styled(LoadingButton)({
  width: "100%",
  background: "white",
  boxShadow: "20px 20px 38px  #15152a, -20px -20px 38px  #232346",
  padding: "8px 12px",
  borderRadius: "24px",
  textTransform: "none",
  color: "#292A2B",
  ":hover": {
    background: "white",
    boxShadow: "20px 20px 38px  #15152a, -20px -20px 38px  #232346",
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
  const dispatch = useDispatch()
  const [showPassword, handleShowPassword] = useState(false);

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
          dispatch(login(res.data))
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
        >
          Forgot your password ?
        </Typography>

        <Typography variant="body1" mt={4}>
          New to our platform ?{" "}
          <a
            style={{
              fontWeight: 700,
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={props.handleLogin}
          >
            Sign Up
          </a>
        </Typography>
      </LoginBox>
    </Container>
  );
}

export default SignIn;