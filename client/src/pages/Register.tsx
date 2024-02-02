import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Box, TextField, Button, Stack } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import LockIcon from "@mui/icons-material/Lock";

interface IFormInput {
  login: string;
  password: string;
  confirmPassword: string;
}

const defaultValues = {
  login: "",
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
      {/* Login Field */}
      <Box sx={boxStyles}>
        <AccountCircle sx={iconStyles} />
        <Controller
          name="login"
          control={control}
          rules={{
            required: "Password Is Required",
            minLength: {
              value: 6,
              message: "Must be greater than 6 characters",
            },
          }}
          render={({ field, fieldState: { invalid } }) => (
            <TextField
              {...field}
              fullWidth
              error={invalid}
              helperText={errors?.login?.message}
              label="Your Login"
              variant="standard"
            />
          )}
        />
      </Box>
      {/* Password Field */}
      <Box sx={boxStyles}>
        <LockIcon sx={iconStyles} />
        <Controller
          rules={{
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                "Minimum 8 characters, at least one letter and one number",
            },
            minLength: {
              value: 6,
              message: "Must be greater than 6 characters",
            },
          }}
          name="password"
          control={control}
          render={({ field, fieldState: { invalid } }) => (
            <TextField
              {...field}
              fullWidth
              error={invalid}
              label="Your password"
              helperText={errors?.password?.message}
              variant="standard"
            />
          )}
        />
      </Box>
      {/* Confirm Password Field */}
      <Box sx={boxStyles}>
        <LockIcon sx={iconStyles} />
        <Controller
          rules={{
            required: "Confirm Password Is Required",
            minLength: {
              value: 6,
              message: "Must be greater than 6 characters",
            },
            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match",
          }}
          name="confirmPassword"
          control={control}
          render={({ field, fieldState: { invalid } }) => (
            <TextField
              {...field}
              fullWidth
              error={invalid}
              label="Your password"
              helperText={errors?.confirmPassword?.message}
              variant="standard"
            />
          )}
        />
      </Box>
      <Stack alignItems="flex-end">
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default Register;
