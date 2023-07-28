import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import TextInput from "../Form/TextInput";
import { Mail, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import Form from "../Form/Form";
import { AlertBox, Container, LightFilledButton, LoginBox } from "./SignIn";

interface Props {
  handleLogin: () => void;
}
type FormProps = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp(props: Props) {
  const [showPassword, handleShowPassword] = useState(false);
  const [showConfirmPassword, handleConfirmPassword] = useState(false);


  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Please enter your username"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password").matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    confirmPassword: Yup.string().required("Please confirm your password").oneOf([Yup.ref('password')], "Passwords don't match."),
  });
  const methods = useForm<FormProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = (data: FormProps) => {
    console.log(data);
    try {
      props.handleLogin()
    } catch (error) {
      console.log("error");
      reset();
    }
  };

  return (
    <Container>
      <AlertBox></AlertBox>
      <LoginBox>
        <Typography variant="h4" fontWeight={600} mb={2} color="#1B1C1D">
          Get Started
        </Typography>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="username"
            placeholder="Enter your username"
            endAdornment={
              <InputAdornment position="end">
                <Person />
              </InputAdornment>
            }
          />
          <TextInput
            name="email"
            type="email"
            placeholder="Enter your email"
            endAdornment={
              <InputAdornment position="end">
                <Mail />
              </InputAdornment>
            }
          />
          <TextInput
            name="password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => handleShowPassword((val) => !val)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <TextInput
            name="confirmPassword"
            placeholder="Re Enter your password"
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => handleConfirmPassword((val) => !val)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          <LightFilledButton variant="contained" type="submit">
            Sign Up
          </LightFilledButton>
        </Form>

        <Typography variant="body1" mt={4}>
          Already have an account ?{" "}
          <a
            style={{ fontWeight: 700, color: "#131E32", cursor: "pointer" }}
            onClick={props.handleLogin}
          >
            Login
          </a>
        </Typography>

        <Typography fontSize={10} mt={2}>
          By creating an account, you are agreeing to our Terms of Service and
          Privacy Policy. You also agree to receive product-related marketing
          emails from Writesonic, which you can unsubscribe from at any time.
        </Typography>
      </LoginBox>
    </Container>
  );
}