import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Box, TextField, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { setCredentials } from "../components/auth/authSlice";
import { CiLogin } from "react-icons/ci";

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
}

import { authValidationRules } from "../utils/authValidationRules";
import { useRegisterUserMutation } from "../api/authApi";

const defaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onSubmitForm: SubmitHandler<IFormInput> = async (data) => {
    try {
      const userData = await registerUser(data).unwrap();
      dispatch(setCredentials({ ...userData }));
      navigate("/templates");

      localStorage.setItem("accessToken", userData.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack p={2} maxWidth={400}>
      <Box mb={2}>
        <Typography component="h2" variant="h4">
          Register
        </Typography>
        <Typography>
          Already have an account? <Link to="/login">Log in here</Link>
        </Typography>
      </Box>

      <Stack
        width="100%"
        onSubmit={handleSubmit(onSubmitForm)}
        component="form"
        spacing={2}
      >
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
              variant="filled"
              size="small"
              placeholder="E-mail address"
            />
          )}
        />

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
              variant="filled"
              size="small"
              type="password"
              placeholder="Password"
            />
          )}
        />
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
              variant="filled"
              size="small"
              type="password"
              placeholder="Confirm Password"
            />
          )}
        />

        <Stack alignItems="flex-end">
          <LoadingButton
            variant="contained"
            loading={isLoading}
            color="primary"
            type="submit"
            endIcon={<CiLogin />}
            loadingPosition="end"
          >
            Register
          </LoadingButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Register;
