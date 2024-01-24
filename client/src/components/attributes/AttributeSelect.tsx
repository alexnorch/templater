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

const AttributeSelect: React.FC<IAttributeSelect> = (props) => {
  const { label, onChange, value, values } = props;

  const renderedOptions = values.map(({ value, _id }) => (
    <MenuItem key={_id} value={_id}>
      {value}
    </MenuItem>
  ));

  return (
    <FormControl sx={{ minWidth: 100 }} size="small" variant="standard">
      <InputLabel>{label}</InputLabel>
      <Select onChange={onChange} value={value} name={label} label={label}>
        {renderedOptions}
      </Select>
    </FormControl>
  );
};

export default AttributeSelect;
