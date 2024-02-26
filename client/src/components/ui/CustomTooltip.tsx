import {
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface CustomTooltipProps {
  title: string;
}

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: 20,
    maxWidth: 280,
    border: "1px solid #dadde9",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#3498db",
  },
}));

const CustomTooltip: React.FC<CustomTooltipProps> = ({ title }) => {
  return (
    <StyledTooltip
      arrow={true}
      placement="right-start"
      title={<Typography>{title}</Typography>}
    >
      <InfoOutlinedIcon />
    </StyledTooltip>
  );
};

export default CustomTooltip;
