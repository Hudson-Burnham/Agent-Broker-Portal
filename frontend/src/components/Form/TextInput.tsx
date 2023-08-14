import { Box, FormControl, TextField, styled } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  type?: string;
  placeholder: string;
  endAdornment?: JSX.Element;
};

export const Input = styled(TextField)({
  padding: 0,
  color: "white",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "white !important",
    ":hover": {
      borderColor: "white",
    },
    ":focus": {
      borderColor: "white",
    },
  },
  "& fieldset": {
    color: "white",
  },
});

const Error = styled(Box)({
  minHeight: "24px",
  fontSize: "12px",
  color: "red",
  textAlign: "left",
});

export default function TextInput(props: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field, fieldState: { error } }: any) => (
        <FormControl fullWidth>
          <Input
            placeholder={props.placeholder}
            autoComplete="off"
            fullWidth
            label={props.label}
            type={props?.type || "text"}
            InputLabelProps={{
              shrink: true,
              style: {
                color: "white",
              },
            }}
            inputProps={{
              style: {
                padding: "12px 16px",
                fontSize: "18px",
                color: "white",
              },
            }}
            InputProps={{
              endAdornment: props?.endAdornment,
            }}
            {...field}
            error={!!error}
          />
          <Error>{error?.message}</Error>
        </FormControl>
      )}
    />
  );
}
