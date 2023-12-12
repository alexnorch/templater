import TextField from "@mui/material/TextField";

interface TemplateSearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TemplateSearch: React.FC<TemplateSearchProps> = ({ value, onChange }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      fullWidth
      id="standard-basic"
      label="Search template"
      variant="standard"
    />
  );
};

export default TemplateSearch;
