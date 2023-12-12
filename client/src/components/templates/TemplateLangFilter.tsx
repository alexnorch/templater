import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface TemplateLangFilterProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

const TemplateLangFilter: React.FC<TemplateLangFilterProps> = ({
  onChange,
  value,
}) => {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">Language</InputLabel>
      <Select
        onChange={onChange}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
      >
        <MenuItem value="PL">PL</MenuItem>
        <MenuItem value="EN">EN</MenuItem>
        <MenuItem value="PT">PT</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TemplateLangFilter;
