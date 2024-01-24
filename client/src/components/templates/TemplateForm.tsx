import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import { useGetCategoriesQuery } from "../categories/categoriesApi";
import { ITemplateItem } from "../../types";

interface ITemplateForm {
  values: ITemplateItem;
  onSubmit: (data: ITemplateItem) => void;
  isLoading: boolean;
}

import { useGetAttributesQuery } from "../attributes/attributeSlice";

// Rules
const required = "The field is required";

const TemplateForm: React.FC<ITemplateForm> = ({
  values,
  isLoading,
  onSubmit,
}) => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: attributesList } = useGetAttributesQuery();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: values });

  const submitForm: SubmitHandler<ITemplateItem> = (data) => {
    onSubmit(data);
  };

  const renderedCategories = categories?.map((item) => (
    <MenuItem key={item._id} value={item.title}>
      {item.title}
    </MenuItem>
  ));

  const renderedAttributes = attributesList?.map(({ label, values, _id }) => {
    const errorsTyped = errors as {
      attributeValues?: Record<string, { message: string }>;
    };

    const labelLowerCase = label.toLocaleLowerCase();
    const errorMessage =
      errorsTyped?.attributeValues?.[labelLowerCase]?.message;

    return (
      <Controller
        key={_id}
        name={`attributeValues.${labelLowerCase}`}
        control={control}
        rules={{ required }}
        render={({ field, fieldState: { invalid } }) => {
          return (
            <FormControl size="small" variant="filled" fullWidth>
              <InputLabel>{label}</InputLabel>
              <Select
                {...field}
                value={field.value || ""}
                error={invalid}
                label={label}
              >
                {values.map(({ value, _id }) => (
                  <MenuItem key={_id} value={_id}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={invalid}>{errorMessage}</FormHelperText>
            </FormControl>
          );
        }}
      />
    );
  });

  return (
    <Stack
      width="100%"
      onSubmit={handleSubmit(submitForm)}
      spacing={2}
      component="form"
    >
      <Controller
        name="title"
        control={control}
        rules={{ required }}
        render={({ field, fieldState: { invalid } }) => (
          <TextField
            fullWidth
            size="small"
            {...field}
            error={invalid}
            helperText={errors?.title?.message}
            label="Template title"
            variant="filled"
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        rules={{ required }}
        render={({ field, fieldState: { invalid } }) => {
          return (
            <FormControl size="small" variant="filled" fullWidth>
              <InputLabel error={invalid}>Category</InputLabel>
              <Select {...field} error={invalid} label="Category">
                {renderedCategories}
              </Select>
              <FormHelperText error={invalid}>
                {errors?.category?.message}
              </FormHelperText>
            </FormControl>
          );
        }}
      />

      <Controller
        name="text"
        control={control}
        rules={{ required }}
        render={({ field, fieldState: { invalid } }) => (
          <TextField
            {...field}
            error={invalid}
            helperText={errors?.text?.message}
            label="Template text"
            multiline
            minRows={8}
            maxRows={12}
          />
        )}
      />

      {/* Additional Template Attributes  */}
      {renderedAttributes}

      <Stack alignItems="flex-end">
        <Button disabled={isLoading} type="submit" variant="contained">
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default TemplateForm;
