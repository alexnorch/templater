import React, { useState } from "react";
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
        sx={{ maxWidth: 600, width: "100%" }}
        handleClose={togglePasswordRecover}
        isOpen={shouldRecover}
        title="Reset Password Form"
      >
        {isSubmitted ? (
          <ResetPasswordConfirmation />
        ) : (
          <ResetPasswordForm onSubmit={onSubmitForm} />
        )}
      </CustomModal>
    </>
  );
};

const ResetPasswordConfirmation: React.FC = () => {
  return (
    <Stack spacing={2}>
      <MarkEmailReadIcon
        sx={{ fontSize: 70, alignSelf: "center" }}
        color="success"
      />
      <Typography>
        An email has been sent to your e-mail address with instruction for
        resetting your password.
      </Typography>
      <Typography>
        This e-mail may take a few minutes to arrive in your inbox.
      </Typography>
    </Stack>
  );
};

const ResetPasswordForm: React.FC<any> = ({ onSubmit }) => {
  return (
    <Stack spacing={2}>
      <Typography>
        Enter your e-mail address, and we'll send you a link to reset your
        password.
      </Typography>
      <TextField label="E-Mail Address" />
      <Button onClick={onSubmit} variant="contained" color="success">
        Submit
      </Button>
    </Stack>
  );
};

export default PasswordRecovery;
