import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { IAttribute } from "../../types";

interface IAttributeSelect extends IAttribute {
  onChange: (e: SelectChangeEvent) => void;
  value: string;
}

const AttributeSelect: React.FC<IAttributeSelect> = ({
  label,
  onChange,
  value,
  values,
}) => {
  const renderedOptions = values.map(({ value, _id }) => (
    <MenuItem key={_id} value={_id}>
      {value}
    </MenuItem>
  ));

  return (
    <FormControl fullWidth size="small" >
      <InputLabel>{label}</InputLabel>
      <Select sx={{ m: 0, }} onChange={onChange} value={value} name={label} label={label} >
        {renderedOptions}
      </Select>
    </FormControl>
  );
};

export default AttributeSelect;
