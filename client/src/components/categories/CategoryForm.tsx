import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Stack, Box, TextField, Button, Typography } from "@mui/material";

import { ICategoryItem } from "../../types";

interface ICategoryForm {
  values: ICategoryItem;
  onSubmit: (data: ICategoryItem) => void;
}

const CategoryForm: React.FC<ICategoryForm> = ({ values, onSubmit }) => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...values } });

  const onSubmitForm: SubmitHandler<ICategoryItem> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <Box onSubmit={handleSubmit(onSubmitForm)} component="form">
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
            variant="filled"
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

export default CategoryForm;
