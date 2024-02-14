import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { useController, UseControllerProps } from "react-hook-form";
import { ITemplateItem } from "../../types";

interface FormSelectFieldProps extends UseControllerProps<ITemplateItem> {
  name: any;
  label: string;
  values: any[];
}

const FormSelectField = (props: FormSelectFieldProps) => {
  const { name, control, values, label } = props;
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  const value = field.value?._id || field.value || "";

  return (
    <FormControl size="small" fullWidth>
      <InputLabel error={invalid}>{label}</InputLabel>
      <Select {...field} value={value} error={invalid} label={label}>
        {values.map(({ value, title, _id }) => (
          <MenuItem key={_id} value={_id}>
            {value || (title && capitalizeFirstLetter(title))}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={invalid}>{error?.message}</FormHelperText>
    </FormControl>
  );
};
export default FormSelectField;
