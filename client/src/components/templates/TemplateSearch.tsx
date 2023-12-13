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
      label="Search template"
      variant="filled"
    />
  );
};

export default TemplateSearch;
