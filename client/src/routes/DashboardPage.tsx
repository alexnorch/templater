import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

const DashboardPage = () => {
  return (
    <Grid container>
      <Grid item md={6}></Grid>
      <Grid item md={6}>
        <Typography component="h2" variant="h5">
          My categories
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
