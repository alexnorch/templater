import { useState } from "react";
import { Stack, Button, Typography, TextField } from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

import { CustomModal } from "../ui";

const PasswordRecovery: React.FC = () => {
  const [shouldRecover, setShouldRecover] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const togglePasswordRecover = () => {
    setShouldRecover((prev) => !prev);
    setIsSubmitted(false);
  };

  const onSubmitForm = () => {
    setIsSubmitted((prev) => !prev);
  };

  return (
    <>
      <Stack alignItems="flex-end">
        <Button onClick={togglePasswordRecover} variant="text">
          Forgot your password?
        </Button>
      </Stack>
      <CustomModal
        sx={{ maxWidth: 450, width: "100%" }}
        handleClose={togglePasswordRecover}
        isOpen={shouldRecover}
        title="Reset Password Form"
      >
        {isSubmitted ? (
          <ResetPasswordConfirmation onSubmit={togglePasswordRecover} />
        ) : (
          <ResetPasswordForm onSubmit={onSubmitForm} />
        )}
      </CustomModal>
    </>
  );
};

const ResetPasswordConfirmation: React.FC<any> = ({ onSubmit }) => {
  return (
    <Stack spacing={2}>
      <MarkEmailReadIcon
        sx={{ fontSize: 70, alignSelf: "center" }}
        color="primary"
      />
      <Typography variant="body2">
        An email has been sent to your e-mail address with instruction for
        resetting your password.
      </Typography>
      <Typography variant="body2">
        This e-mail may take a few minutes to arrive in your inbox.
      </Typography>
      <Button onClick={onSubmit} variant="contained">
        Ok
      </Button>
    </Stack>
  );
};

const ResetPasswordForm: React.FC<any> = ({ onSubmit }) => {
  return (
    <Stack spacing={2}>
      <Typography variant="body2">
        Enter your e-mail address, and we'll send you a link to reset your
        password.
      </Typography>
      <TextField size="small" label="E-Mail Address" />
      <Button onClick={onSubmit} variant="contained">
        Submit
      </Button>
    </Stack>
  );
};

export default PasswordRecovery;
