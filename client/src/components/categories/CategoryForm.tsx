import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Stack, Box, TextField, Button } from "@mui/material";

import { ICategoryItem } from "../../types";

interface ICategoryForm {
  values: ICategoryItem;
  onSubmit: (data: ICategoryItem) => void;
  isLoading: boolean;
}

const CategoryForm: React.FC<ICategoryForm> = ({
  values,
  onSubmit,
  isLoading,
}) => {
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
    <Box px={2} onSubmit={handleSubmit(onSubmitForm)} component="form">
      <Controller
        name="title"
        control={control}
        rules={{ required: "The field is required" }}
        render={({ field, fieldState: { invalid } }) => (
          <TextField
            size="small"
            {...field}
            fullWidth
            error={invalid}
            helperText={errors?.title?.message}
            label="Category title"
          />
        )}
      />
      <Stack my={2}>
        <Button disabled={isLoading} type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default CategoryForm;
