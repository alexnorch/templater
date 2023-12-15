import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { Box, TextField, Button, Stack } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import LockIcon from "@mui/icons-material/Lock";

interface IFormInput {
  login: string;
  password: string;
}

const defaultValues = {
  login: "",
  password: "",
};

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmitForm: SubmitHandler<IFormInput> = (data) => {
    console.log("Submited", data);
  };

  const boxStyles = {
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
  };

  return (
    <Stack
      onSubmit={handleSubmit(onSubmitForm)}
      minWidth={400}
      component="form"
      spacing={2}
    >
      {/* Login Field */}
      <Box sx={boxStyles}>
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <Controller
          name="login"
          control={control}
          rules={{
            required: "Password is required",
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
              label="Your login"
              variant="standard"
            />
          )}
        />
      </Box>
      {/* Password Field */}
      <Box sx={boxStyles}>
        <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <Controller
          rules={{
            required: "Password is required",
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
      <Stack alignItems="flex-end">
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
