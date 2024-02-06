import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Grid,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import { useGetAttributesQuery } from "../attributes/attributeSlice";
import { ITemplateItem, IAttributeValue, ICategoryItem } from "../../types";
import { useGetCategoriesQuery } from "../categories/categoryApi";
import NoCategoriesMessage from "../categories/NoCategoriesMessage";

import { formatTemplateData, capitalizeFirstLetter } from "../../utils/helpers";

interface TemplateFormProps {
  mode: "edit" | "create";
  values: ITemplateItem;
  onSubmit: (data: ITemplateItem) => void;
  isLoading: boolean;
}

// Rules
const required = "The field is required";

const TemplateForm: React.FC<TemplateFormProps> = ({
  mode,
  values,
  isLoading,
  onSubmit,
}) => {
  const { data: categories = [], isSuccess: isCategoriesSuccess } =
    useGetCategoriesQuery();
  const { data: attributesList = [] } = useGetAttributesQuery();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: values });

  useEffect(() => {
    if (mode === "edit") {
      if (Array.isArray(values.attributeValues)) {
        values.attributeValues.forEach((item: IAttributeValue) => {
          const lowerLabel = item.attribute.toLowerCase();
          setValue(`attributeValues.${lowerLabel}`, item._id);
        });
      }
    }
  }, []);

  const submitForm: SubmitHandler<ITemplateItem> = (data) => {
    onSubmit(formatTemplateData(data));
  };

  const renderedAttributes = attributesList.map(({ label, values, _id }) => {
    const errorsTyped = errors as {
      attributeValues?: Record<string, { message: string }>;
    };

    const labelLowerCase = label.toLocaleLowerCase();
    const errorMsg = errorsTyped?.attributeValues?.[labelLowerCase]?.message;

    return (
      <Grid item md={2.5} key={_id}>
        <Controller
          name={`attributeValues.${labelLowerCase}`}
          control={control}
          rules={{ required }}
          render={({ field, fieldState: { invalid } }) => {
            return (
              <FormControl size="small" fullWidth>
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
                <FormHelperText error={invalid}>{errorMsg}</FormHelperText>
              </FormControl>
            );
          }}
        />
      </Grid>
    );
  });

  return (
    <Stack onSubmit={handleSubmit(submitForm)} spacing={2} component="form">
      {categories.length === 0 && <NoCategoriesMessage />}
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
          />
        )}
      />

      {isCategoriesSuccess && (
        <Controller
          name="category"
          control={control}
          rules={{ required }}
          render={({ field, fieldState: { invalid } }) => {
            const value =
              typeof field.value === "object"
                ? field.value._id || ""
                : field.value || "";

            return (
              <FormControl size="small" fullWidth>
                <InputLabel error={invalid}>Category</InputLabel>
                <Select
                  {...field}
                  value={value}
                  error={invalid}
                  label="Category"
                >
                  {categories?.map(({ _id, title }: ICategoryItem) => (
                    <MenuItem key={_id} value={_id}>
                      {title && capitalizeFirstLetter(title)}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={invalid}>
                  {errors?.category?.message}
                </FormHelperText>
              </FormControl>
            );
          }}
        />
      )}

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
      <Grid container flexDirection="row" flexWrap="wrap" gap={2}>
        {renderedAttributes}
      </Grid>

      <Stack alignItems="flex-end">
        <Button
          disabled={categories!.length === 0 || isLoading}
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default TemplateForm;
