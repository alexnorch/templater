import { Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CustomTooltip } from ".";

const styles = {
  position: "fixed",
  bottom: 25,
  right: 25,
  "&.Mui-disabled": {
    pointerEvents: "all",
  },
};

const AddButton: React.FC<any> = ({ onClick, disabled, tooltipText }) => {
  const tooltipTitle = disabled ? tooltipText : undefined;

  return (
    <Fab disabled={disabled} onClick={onClick} sx={styles} color="primary">
      <CustomTooltip placement="top-end" title={tooltipTitle}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", height: "100%" }}
        >
          <AddIcon />
        </Box>
      </CustomTooltip>
    </Fab>
  );
};

export default AddButton;
