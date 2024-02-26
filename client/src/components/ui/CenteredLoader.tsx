import { CircularProgress, Box } from "@mui/material";

const CenteredLoader: React.FC = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%);",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default CenteredLoader;
