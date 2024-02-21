import { useDispatch } from "react-redux";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Stack, Typography, Box } from "@mui/material";
import { authValidationRules } from "../utils/authValidationRules";

import { useLoginUserMutation } from "../components/auth/authApiSlice";
import { setCredentials } from "../components/auth/authSlice";

interface IFormInput {
  email: string;
  password: string;
}

const defaultValues = { email: "", password: "" };

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitForm: SubmitHandler<IFormInput> = (data) => {
    handleLoginUser(data);
  };

  const [loginUser] = useLoginUserMutation();

  const handleLoginUser = async (credentials: IFormInput) => {
    try {
      const userData = await loginUser(credentials).unwrap();
      dispatch(setCredentials({ ...userData }));
      navigate("/templates");
      localStorage.setItem("accessToken", userData.accessToken);
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
      <Stack
        onSubmit={handleSubmit(onSubmitForm)}
        minWidth={400}
        component="form"
        spacing={3}
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
          rules={authValidationRules.loginPassword}
          name="password"
          control={control}
          render={({ field, fieldState: { invalid } }) => (
            <TextField
              {...field}
              fullWidth
              type="password"
              error={invalid}
              helperText={errors?.password?.message}
              placeholder="Password"
              variant="filled"
              size="small"
            />
          )}
        />

        <Stack alignItems="flex-end">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
