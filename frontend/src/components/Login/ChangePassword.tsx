import { useForm } from "react-hook-form";
import Form from "../Form/Form";
import TextInput from "../Form/TextInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MainButton, SecondaryButton } from "./SignIn";
import { Dispatch, SetStateAction } from "react";
import { Typography } from "@mui/material";
import { forgotPassword } from "../../axios";

type Props = {
  setValue: Dispatch<SetStateAction<boolean>>;
  setAlertText: Dispatch<SetStateAction<string>>;
  setShowAlert: Dispatch<SetStateAction<number>>;
};
type FormProps = {
  email: string;
};
function ChangePassword(props: Props) {
  const defaultValues = {
    email: "",
  };
  const EmailSchema = Yup.object().shape({
    email: Yup.string().trim().email().required("Email is required"),
  });
  const methods = useForm<FormProps>({
    resolver: yupResolver(EmailSchema),
    defaultValues,
  });
  const { reset, handleSubmit } = methods;
  const onSubmit = async (data: FormProps) => {
    console.log(data);
    try {
      await forgotPassword(data)
        .then((res) => {
          if(res.data?.error) {
            props.setAlertText(res.data.error)
            props.setShowAlert(-1)
          } else {
            props.setAlertText(res.data.message)
            props.setShowAlert(1)
          }
        })
    } catch (error) {
      props.setAlertText("Encountered some error. Please retry after some time...");
      props.setShowAlert(-1);
      reset();
    }
  };
  return (
    <div style={{ maxWidth: "360px", color: "white" }}>
      <Typography variant="h5" fontWeight={800} mb={0.5} align="left">
        Reset your password
      </Typography>
      <Typography variant="subtitle1" mb={4} align="left">
        We’ll send you an email to reset your password.
      </Typography>

      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
        />

        <MainButton variant="contained" type="submit">
          Continue
        </MainButton>
        <SecondaryButton
          variant="contained"
          style={{ marginTop: 16 }}
          onClick={() => {
            props.setShowAlert(0)
            props.setValue((prev) => !prev)
          }}
        >
          Back to Login
        </SecondaryButton>
      </Form>
    </div>
  );
}

export default ChangePassword;