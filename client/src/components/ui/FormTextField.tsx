import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { ITemplateItem } from "../../types";

interface FormTextFieldProps extends UseControllerProps<ITemplateItem> {
  label: string;
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  control,
  label,
  name,
}) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <TextField
      {...field}
      fullWidth
      size="small"
      error={invalid}
      helperText={error?.message}
      label={label}
      multiline={name === "text"}
      minRows={name === "text" ? 8 : undefined}
      maxRows={name === "text" ? 12 : undefined}
    />
  );
};

export default FormTextField;
