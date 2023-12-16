import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button, Typography, Stack, Box } from "@mui/material";

const defaultValues = {
  title: "",
};

interface IFormInput {
  title: string;
}

const CategoryAdd = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Box onSubmit={handleSubmit(onSubmit)} component="form">
      <Typography mb={2} component="h4" variant="h5">
        Create new category
      </Typography>
      <Controller
        name="title"
        control={control}
        rules={{ required: "The field is required" }}
        render={({ field, fieldState: { invalid } }) => (
          <TextField
            {...field}
            fullWidth
            error={invalid}
            helperText={errors?.title?.message}
            label="Category title"
            variant="outlined"
          />
        )}
      />
      <Stack my={2}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default CategoryAdd;
