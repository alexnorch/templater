import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { useController, UseControllerProps } from "react-hook-form";
import { ITemplateItem } from "../../types";

interface FormSelectFieldProps extends UseControllerProps<ITemplateItem> {
  name: any;
  label: string;
  values: any[];
}

const FormSelectField: React.FC<FormSelectFieldProps> = ({
  name,
  control,
  values,
  label,
}) => {
  const { field } = useController({
    name,
    control,
  });

  const value = field.value?._id || field.value || "";

  const selectOptions = values.map(({ value, title, _id }) => (
    <MenuItem key={_id} value={_id}>
      {value || (title && capitalizeFirstLetter(title))}
    </MenuItem>
  ));

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <InputLabel shrink>{label}</InputLabel>
      <Select displayEmpty {...field} value={value} label={label}>
        {selectOptions}
        {name !== "category" && <MenuItem value="">None</MenuItem>}
      </Select>
    </FormControl>
  );
};
export default FormSelectField;
