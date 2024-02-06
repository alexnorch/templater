import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Box, TextField, Button, Stack } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import LockIcon from "@mui/icons-material/Lock";

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
}

import { authValidationRules } from "../utils/authValidationRules";

const defaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const boxStyles = {
  display: "flex",
  alignItems: "flex-end",
  width: "100%",
};

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmitForm: SubmitHandler<IFormInput> = (data) => {
    console.log("Submitted", data);
  };

  const iconStyles = { color: "action.active", mr: 1, my: 0.5 };

  return (
    <Stack
      onSubmit={handleSubmit(onSubmitForm)}
      minWidth={400}
      component="form"
      spacing={2}
    >
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <AccountCircle sx={iconStyles} />
        <Controller
          name="email"
          control={control}
          rules={authValidationRules.email}
          render={({ field, fieldState: { invalid } }) => (
            <TextField
              {...field}
              fullWidth
              error={invalid}
              helperText={errors?.email?.message}
              variant="standard"
              placeholder="E-mail address"
            />
          )}
        />
      </Stack>
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <LockIcon sx={iconStyles} />
        <Controller
          name="password"
          control={control}
          rules={authValidationRules.registerPassword}
          render={({ field, fieldState: { invalid } }) => (
            <TextField
              {...field}
              fullWidth
              error={invalid}
              helperText={errors?.password?.message}
              variant="standard"
              placeholder="Password"
            />
          )}
        />
      </Stack>
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <LockIcon sx={iconStyles} />
        <Controller
          rules={authValidationRules.confirmPassword}
          name="confirmPassword"
          control={control}
          render={({ field, fieldState: { invalid } }) => (
            <TextField
              {...field}
              fullWidth
              error={invalid}
              helperText={errors?.confirmPassword?.message}
              variant="standard"
              placeholder="Confirm Password"
            />
          )}
        />
      </Stack>
      <Stack alignItems="flex-end">
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default Register;
