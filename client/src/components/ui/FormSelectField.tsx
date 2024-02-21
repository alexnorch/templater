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
  const { field } = useController({
    name,
    control,
  });

  const value = field.value?._id || field.value || "";

  return (
    <FormControl size="small" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select {...field} value={value} label={label}>
        {values.map(({ value, title, _id }) => (
          <MenuItem key={_id} value={_id}>
            {value || (title && capitalizeFirstLetter(title))}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default FormSelectField;
