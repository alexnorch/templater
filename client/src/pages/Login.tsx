import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { TextField, Stack, Typography, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { authValidationRules } from "../utils/authValidationRules";
import PasswordInput from "../components/ui/InputPassword";

import { useLoginUserMutation } from "../api/authApi";
import { setCredentials } from "../store/slices/authSlice";

interface IFormInput {
  email: string;
  password: string;
}

const defaultValues = { email: "", password: "" };

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitForm: SubmitHandler<IFormInput> = (data) => {
    handleLoginUser(data);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleLoginUser = async (credentials: IFormInput) => {
    try {
      const userData = await loginUser(credentials).unwrap();

      dispatch(setCredentials({ ...userData }));
      navigate("/");

      localStorage.setItem("accessToken", userData.accessToken);
      localStorage.setItem('userData', JSON.stringify(userData.user))

    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Stack>
      <Box mb={2}>
        <Typography component="h2" variant="h4">
          Login
        </Typography>
        <Typography>
          Don't have an account yet? <Link to="/register">Register now!</Link>
        </Typography>
      </Box>

      <Stack onSubmit={handleSubmit(onSubmitForm)} component="form" spacing={3}>
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
          rules={authValidationRules.loginPassword}
          name="password"
          control={control}
          render={({ field, fieldState: { invalid } }) => (
            <PasswordInput
              {...field}
              fullWidth
              variant="filled"
              showPassword={showPassword}
              toggleShowPassword={toggleShowPassword}
              error={invalid}
              helperText={errors?.password?.message}
              placeholder="Password"
              size="small"
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
            Log In
          </LoadingButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
