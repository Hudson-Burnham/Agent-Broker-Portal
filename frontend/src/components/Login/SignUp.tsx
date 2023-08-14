import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import TextInput from "../Form/TextInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Form from "../Form/Form";
import {
  AlertBox,
  Container,
  MainButton,
  LoginBox,
  SecondaryButton,
} from "./SignIn";
import { registerUserRequest } from "../../axios";

interface Props {
  handleLogin: () => void;
}
type FormProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp(props: Props) {
  const [showPassword, handleShowPassword] = useState(false);
  const [showConfirmPassword, handleConfirmPassword] = useState(false);

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const LoginSchema = Yup.object().shape({
    name: Yup.string().trim().required("Name is required"),
    email: Yup.string().trim().email().required("Email is required"),
    password: Yup.string()
      .trim()
      .required("Password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: Yup.string()
      .trim()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password")], "Passwords don't match."),
  });
  const methods = useForm<FormProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;
  const onSubmit = async (data: FormProps) => {
    console.log(data);
    try {
      await registerUserRequest(data)
        .then((res) => console.log(res))
        .catch((err) =>
          console.log("error while registering a user , : ", err)
        );
      props.handleLogin();
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
          Create an account
        </Typography>
        <Typography variant="subtitle1" mb={3} align="left">
          Let's Get Started!
        </Typography>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <TextInput name="name" placeholder="Enter your name" label="Name" />
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
          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Re Enter your password"
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => handleConfirmPassword((val) => !val)}
                >
                  {showConfirmPassword ? (
                    <VisibilityOff style={{ color: "white" }} />
                  ) : (
                    <Visibility style={{ color: "white" }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />

          <MainButton variant="contained" type="submit">
            Sign Up
          </MainButton>
          <SecondaryButton variant="contained" style={{ marginTop: 16 }}>
            Continue with email
          </SecondaryButton>
        </Form>

        <Typography variant="body2" mt={2}>
          Already have an account ?{" "}
          <a
            style={{
              fontWeight: 700,
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={props.handleLogin}
          >
            Log in
          </a>
        </Typography>
      </LoginBox>
    </Container>
  );
}
