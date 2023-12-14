import { Box, TextField, Button, Stack } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
  return (
    <Stack minWidth={400} component="form" spacing={2}>
      <Box width="100%" sx={{ display: "flex", alignItems: "flex-end" }}>
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField fullWidth label="Your login" variant="standard" />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          fullWidth
          type="password"
          label="Your Password"
          variant="standard"
        />
      </Box>
      <Stack alignItems="flex-end">
        <Button variant="contained">Submit</Button>
      </Stack>
    </Stack>
  );
};

export default Login;
