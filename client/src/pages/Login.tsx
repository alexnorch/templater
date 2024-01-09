import axios from "axios";
import { useDispatch } from "react-redux";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Box, TextField, Button, Stack } from "@mui/material";
import { loginUser } from "../store/reducers/userSlice";
import useAlert from "../hooks/useAlert";

// Icons
import { AccountCircle } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";

interface IFormInput {
  email: string;
  password: string;
}

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const { showErrorAlert } = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitForm: SubmitHandler<IFormInput> = (data) => {
    handleLoginUser(data);
  };

  const boxStyles = {
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
  };

  const handleLoginUser = async (credentials: IFormInput) => {
    try {
      const response = await axios.post("/api/users/login", credentials);

      const { token, data } = response.data;

      localStorage.setItem("accessToken", token);

      dispatch(loginUser(token));

      navigate("/templates");
    } catch (error: any) {
      const errorMsg = error.response.data.message;
      showErrorAlert(errorMsg);
    }
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
          name="email"
          control={control}
          rules={{
            required: "Email is required",
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
              helperText={errors?.email?.message}
              label="Your e-mail"
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
              type="password"
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
