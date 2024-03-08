import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { useController, UseControllerProps } from "react-hook-form";
import { ITemplateItem } from "../../types";
import React from "react";

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

  return (
    <FormControl variant="filled" size="small" fullWidth>
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
