import { useDispatch } from "react-redux";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack } from "@mui/material";
// import { loginUser } from "../store/reducers/userSlice";
import { AccountCircle } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import { authValidationRules } from "../utils/authValidationRules";

import { useLoginUserMutation } from "../components/auth/authApiSlice";
import { setCredentials } from "../components/auth/authSlice";

interface IFormInput {
  email: string;
  password: string;
}

const iconStyles = { color: "action.active", mr: 1, my: 0.5 };
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
    } catch (error: any) {
      const errorMsg = error.response.data.message;
    }
  };

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
              variant="standard"
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

export default Login;
