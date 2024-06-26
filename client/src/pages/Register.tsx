import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { CiLogin } from "react-icons/ci";
import { Box, TextField, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { setCredentials } from "../store/slices/authSlice";
import { InputPassword } from "../components/ui";
import { authValidationRules } from "../utils/authValidationRules";
import { useRegisterUserMutation } from "../api/authApi";
import type { IRegisterForm } from "../types";

const defaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const onSubmitForm: SubmitHandler<IRegisterForm> = async (data) => {
    try {
      const userData = await registerUser(data).unwrap();
      dispatch(setCredentials({ ...userData }));
      navigate("/templates");

      localStorage.setItem("accessToken", userData.accessToken);
      localStorage.setItem("userData", JSON.stringify(userData.user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack>
      <Box mb={2}>
        <Typography component="h2" variant="h4">
          Register
        </Typography>
        <Typography>
          Already have an account? <Link to="/login">Log in here</Link>
        </Typography>
      </Box>

      <Stack onSubmit={handleSubmit(onSubmitForm)} component="form" spacing={2}>
        <Controller
          name="email"
          control={control}
          rules={authValidationRules.email}
          render={({ field, fieldState: { invalid } }) => (
            <TextField
              {...field}
              value={field.value.trim()}
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
            <InputPassword
              {...field}
              value={field.value.trim()}
              fullWidth
              error={invalid}
              helperText={errors?.password?.message}
              variant="filled"
              size="small"
              type="password"
              placeholder="Password"
              showPassword={showPassword}
              toggleShowPassword={togglePassword}
            />
          )}
        />

        <Controller
          rules={authValidationRules.confirmPassword}
          name="confirmPassword"
          control={control}
          render={({ field, fieldState: { invalid } }) => (
            <InputPassword
              {...field}
              fullWidth
              value={field.value.trim()}
              error={invalid}
              helperText={errors?.confirmPassword?.message}
              variant="filled"
              size="small"
              type="password"
              placeholder="Confirm Password"
              showPassword={showConfirmPassword}
              toggleShowPassword={toggleConfirmPassword}
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
