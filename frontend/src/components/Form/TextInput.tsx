import { Box, FormControl, TextField, styled } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  type?: string;
  placeholder: string;
  endAdornment?: JSX.Element;
  disabled?: boolean
  multiline?: boolean
};

export const Input = styled(TextField)({
  padding: 0,
  color: "white",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "white !important",
    borderRadius: "8px",
    ":hover": {
      borderColor: "white",
    },
    ":focus": {
      borderColor: "white",
    },
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#A2918199 !important",
  },
  
  "& fieldset": {
    color: "white",
  },
});

const Error = styled(Box)({
  minHeight: "28px",
  fontSize: "12px",
  color: '#d5d5d5',
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
                padding: props?.multiline ? '': "12px 16px",
                fontSize: "18px",
                color: "white",
              },
            }}
            InputProps={{
              endAdornment: props?.endAdornment,
            }}
            multiline={props?.multiline}
            disabled={props?.disabled}
            rows={4}
            maxRows={4}
            {...field}
            error={!!error}
          />
          <Error>{error?.message}</Error>
        </FormControl>
      )}
    />
  );
}
