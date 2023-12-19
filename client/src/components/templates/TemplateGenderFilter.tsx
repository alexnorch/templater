// Components
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

// Icons
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import WcIcon from "@mui/icons-material/Wc";

interface TemplateGenderFilterProps {
  value: string;
  onChange: (e: React.MouseEvent<HTMLElement>, value: string) => void;
}

const TemplateGenderFilter: React.FC<TemplateGenderFilterProps> = ({
  onChange,
  value,
}) => {
  return (
    <ToggleButtonGroup onChange={onChange} value={value} exclusive size="small">
      <ToggleButton value="Man">
        <ManIcon />
      </ToggleButton>
      <ToggleButton value="Woman">
        <WomanIcon />
      </ToggleButton>
      <ToggleButton value="Both">
        <WcIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TemplateGenderFilter;
