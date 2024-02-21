const registerPasswordPattern = {
  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  message: "Minimum 8 characters, at least one letter and one number",
};

const emailPattern = {
  value:
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  message: "Please enter a valid email address",
};

const getMinLength = (value: number) => {
  return {
    value,
    message: `Must be greater than ${value} characters`,
  };
};

export const authValidationRules = {
  email: {
    required: "Email is required",
    minLength: getMinLength(6),
    pattern: emailPattern,
  },
  loginPassword: {
    required: "Password is required",
    minLength: getMinLength(8),
  },
  registerPassword: {
    required: "Password is required",
    pattern: registerPasswordPattern,
    minLength: getMinLength(6),
  },
  confirmPassword: {
    required: "Confirm Password is required",
    minLength: getMinLength(6),
    validate: (value: any, formValues: any) =>
      value === formValues.password || "Passwords do not match",
  },
};
