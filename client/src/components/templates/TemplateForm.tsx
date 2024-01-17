import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";

import { useGetCategoriesQuery } from "../categories/categoriesApi";
import { ITemplateItem } from "../../types";

interface ITemplateForm {
  values: ITemplateItem;
  onSubmit: (data: ITemplateItem) => void;
  isLoading: boolean;
}

const selectCustomAttributes = (state: RootState) =>
  state.filter.customAttributes;

const TemplateForm: React.FC<ITemplateForm> = ({
  values,
  isLoading,
  onSubmit,
}) => {
  const { data: categories } = useGetCategoriesQuery();
  const additionalAttributes = useSelector(selectCustomAttributes);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ values });

  const submitForm: SubmitHandler<ITemplateItem> = (data) => {
    onSubmit(data);
  };

  const templateCategories = categories!.map((item) => (
    <MenuItem key={item._id} value={item.title}>
      {item.title}
    </MenuItem>
  ));

  // Rules
  const required = "The field is required";

  const customAttributes = additionalAttributes.map(
    ({ label, options }, index) => {
      const labelLowerCase = label.toLocaleLowerCase();

      return (
        <Controller
          key={index}
          name={`attributes.${labelLowerCase}`}
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
                  {options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={invalid}>
                  {errors?.attributes?.[labelLowerCase]?.message}
                </FormHelperText>
              </FormControl>
            );
          }}
        />
      );
    }
  );

  return (
    <Stack
      width="100%"
      onSubmit={handleSubmit(submitForm)}
      spacing={2}
      component="form"
    >
      <Stack flexDirection="row" gap={2}>
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
                  {templateCategories}
                </Select>
                <FormHelperText error={invalid}>
                  {errors?.category?.message}
                </FormHelperText>
              </FormControl>
            );
          }}
        />
      </Stack>

      {/* Additional Template Attributes  */}
      {customAttributes}

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
      <Stack alignItems="flex-end">
        <Button disabled={isLoading} type="submit" variant="contained">
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default TemplateForm;
