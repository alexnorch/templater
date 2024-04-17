import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput
} from "@mui/material";

import { useGetAttributesQuery } from "../../api/attributeApi";
import { setAttributeLabel } from "../../store/slices/filterSlice";

const FilterByAttribute: React.FC = () => {
  const [attrLabels, setAttrLabels] = useState<string[]>([])
  const { data: attributesList = [] } = useGetAttributesQuery();
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent<typeof attrLabels>) => {
    const { value } = event.target;
    const selectedAttributes = attributesList.filter((el) => value.includes(el.label))

    setAttrLabels(typeof value === 'string' ? value.split(',') : value)
    dispatch(setAttributeLabel(selectedAttributes))
  };

  return (
    <FormControl sx={{ width: 200 }} size="small">
      <InputLabel>Attributes</InputLabel>
      <Select
        multiple
        value={attrLabels}
        onChange={handleChange}
        input={<OutlinedInput label="Attributes" />}
        renderValue={(selected) => selected.join(', ')}
      >
        {attributesList.map(({ _id, label }) => (
          <MenuItem key={_id} value={label}>
            <Checkbox checked={attrLabels.indexOf(label) > -1} />
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterByAttribute;
