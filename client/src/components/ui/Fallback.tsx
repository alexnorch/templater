import { Stack, Typography, Button } from "@mui/material";
import { FallbackProps } from "react-error-boundary";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const Fallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  console.error("Attention", error);

  return (
    <Stack
      position="absolute"
      left="50%"
      top="50%"
      sx={{ transform: "translate(-50%, -50%)" }}
    >
      <Stack textAlign="center" alignItems="center" spacing={2} maxWidth={600}>
        <ReportProblemIcon sx={{ fontSize: 50 }} color="error" />
        <Typography component="h1" variant="h2">
          Whoops, something went wrong
        </Typography>
        <Typography component="p" variant="body2">
          There was a problem processing your request. Please try again later
        </Typography>
        <Button onClick={() => resetErrorBoundary()} variant="contained">
          Return to the last page
        </Button>
      </Stack>
    </Stack>
  );
};

export default Fallback;
