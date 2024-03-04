import {
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

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

const CustomTooltip: React.FC<TooltipProps> = ({ title, children }) => {
  const tooltipText = title ? <Typography>{title}</Typography> : undefined;

  return (
    <StyledTooltip arrow={true} placement="right-start" title={tooltipText}>
      {children}
    </StyledTooltip>
  );
};

export default CustomTooltip;
