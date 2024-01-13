import { Select, Stack, MenuItem, Typography } from "@mui/material";

interface IFilterSelect {
  label: string;
  onChange: any;
  options: any[];
  value: string;
}

const FilterSelect: React.FC<IFilterSelect> = ({
  label,
  onChange,
  value,
  options,
}) => {
  return (
    <Stack spacing={1}>
      <Typography variant="body1" component="h4">
        {label}
      </Typography>
      <Select
        size="small"
        onChange={onChange}
        variant="standard"
        value={value}
        label={label}
      >
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default FilterSelect;
