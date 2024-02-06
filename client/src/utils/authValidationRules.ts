const registerPasswordPattern = {
  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  message: "Minimum 8 characters, at least one letter and one number",
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
