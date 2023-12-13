import { TextField, Button, Typography, Stack } from "@mui/material";

const CategoryAdd = () => {
  return (
    <>
      <Typography mb={2} component="h3" variant="h6">
        Create new category
      </Typography>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Category title"
        variant="outlined"
      />
      <Stack my={2}>
        <Button variant="contained">Submit</Button>
      </Stack>
    </>
  );
};

export default CategoryAdd;
