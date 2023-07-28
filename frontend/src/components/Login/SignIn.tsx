import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Typography, styled } from "@mui/material";
import Form from "../Form/Form";
import TextInput from "../Form/TextInput";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  textAlign: "center",
});
export const AlertBox = styled("div")({
  minHeight: "80px",
});
export const LoginBox = styled("div")({
  maxWidth: "360px",
  color: "#292A2B",
});

export const LightFilledButton = styled(LoadingButton)({
  width: "100%",
  background: "#A29181",
  padding: "12px 16px",
  fontWeight: 800,
  ":hover": {
    background: "#A29181",
  },
});

interface Props {
  handleLogin: () => void;
  setAuth: () => void
}

type FormProps = {
  username: string;
  password: string;
};
// <a href="https://www.freepik.com/free-vector/handsome-man_23815767.htm#query=single%20person&position=35&from_view=keyword&track=ais">Image by brgfx</a> on Freepik
// <a href="https://www.freepik.com/free-photo/fun-horse-3d-illustration_14199763.htm#query=smart%20animals%20funny%20illustration&position=0&from_view=search&track=ais">Image by julos</a> on Freepik
function SignIn(props: Props) {
  const [showPassword, handleShowPassword] = useState(false);

  const defaultValues = {
    username: "",
    password: "",
  };
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required").matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special character."
    ),
  });
  const methods = useForm<FormProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = (data: FormProps) => {
    console.log(data);
    try {
      props.setAuth()
    } catch (error) {
      console.log("error");
      reset();
    }
  };

  return (
    <Container>
      <AlertBox></AlertBox>
      <LoginBox>
        <Typography variant="h4" fontWeight={600} mb={1} color="#1B1C1D">
          Welcome back
        </Typography>
        <Typography variant="body1" mb={3}>
          Have we met before?
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
          <LightFilledButton variant="contained" type="submit">
            Log In
          </LightFilledButton>
        </Form>
        <Typography
          variant="body2"
          fontWeight={800}
          style={{ cursor: "pointer", color: "#131E32" }}
          mt={2}
        >
          Forgot your password ?
        </Typography>

        <Typography variant="body1" mt={4}>
          New to our platform ?{" "}
          <a
            style={{ fontWeight: 700, color: "#131E32", cursor: "pointer" }}
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