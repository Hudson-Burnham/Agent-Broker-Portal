import { Box, FormControl, TextField, styled } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  type?: string;
  placeholder: string;
  endAdornment?: JSX.Element;
};

export const Input = styled(TextField)({
    padding: 0,
  border: "1px solid #292A2B77",
  "& fieldset": {
    display: "none",
  },
});

const Error = styled(Box)({
  minHeight: '24px',
  fontSize: '12px',
  color: 'red',
  textAlign: 'left'
})

export default function TextInput(props: Props) {
  const { control } = useFormContext()
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
            type={props?.type || "text"}
            inputProps={{
                style: {
                    padding: '12px 6px',
                    fontSize: '18px'
                }
            }}
            InputProps={{
              endAdornment: props?.endAdornment,
            }}
            {...field}
            error={!!error}
          />
          <Error>
            {error?.message}
          </Error>
        </FormControl>
      )}
    />
  );
}
