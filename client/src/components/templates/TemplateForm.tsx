import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { Grid, Stack, FormHelperText, Button } from "@mui/material";

import { useGetAttributesQuery } from "../../api/attributeApi";
import { ITemplateItem, IAttributeValue } from "../../types";
import { useGetCategoriesQuery } from "../../api/categoryApi";
import NoCategoriesMessage from "../categories/NoCategoriesMessage";
import FormSelectField from "../ui/FormSelectField";
import FormTextField from "../ui/FormTextField";

import { formatTemplateData } from "../../utils/helpers";

import FormTextEditor from "../ui/FormTextEditor";

interface TemplateFormProps {
  mode: "edit" | "create";
  values: ITemplateItem;
  onSubmit: (data: ITemplateItem) => void;
  isLoading: boolean;
}

interface CustomFieldErrors extends FieldErrors<ITemplateItem> {
  attributeValues?: Record<string, { message: string }>;
  [key: string]: any;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
  mode,
  values,
  onSubmit,
}) => {
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: attributesList = [] } = useGetAttributesQuery();

  const methods = useForm({ defaultValues: values });
  const navigate = useNavigate();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  useEffect(() => {
    setDefaultAttributeValues();
  }, []);

  const setDefaultAttributeValues = () => {
    if (mode === "edit") {
      if (Array.isArray(values.attributeValues)) {
        values.attributeValues.forEach((item: IAttributeValue) => {
          const lowerLabel = item.attribute.toLowerCase();
          setValue(`attributeValues.${lowerLabel}`, item._id);
        });
      }
    }
  };

  const submitForm: SubmitHandler<ITemplateItem> = (data) => {
    onSubmit(formatTemplateData(data));
  };

  const renderedAttributes = attributesList.map(({ label, values, _id }) => {
    const labelLowerCase = label.toLowerCase();

    const name = `attributeValues.${labelLowerCase}` as keyof ITemplateItem;
    const errorMsg = (errors as CustomFieldErrors)[
      name as keyof CustomFieldErrors
    ]?.message;

    return (
      <Grid item xs={3} md={2.5} key={_id}>
        <FormSelectField
          control={control}
          name={name}
          label={label}
          values={values}
        />
        <FormHelperText error={!!errorMsg}>{errorMsg}</FormHelperText>
      </Grid>
    );
  });

  return (
    <Stack onSubmit={handleSubmit(submitForm)} spacing={2} component="form">
      <Stack flexDirection="row" gap={2}>
        <FormTextField control={control} name="title" label="Title" />
        <FormSelectField
          control={control}
          name="category"
          label="Category"
          values={categories}
        />
      </Stack>

      {/* Text */}
      <FormTextEditor control={control} name="text" />

      {/* Custom attributes */}
      <Stack>
        <Grid container flexDirection="row" flexWrap="wrap" gap={2}>
          {renderedAttributes}
        </Grid>
      </Stack>

      {categories.length === 0 && <NoCategoriesMessage />}

      <Stack
        gap={2}
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        {mode === "edit" && (
          <Button onClick={() => navigate(-1)} variant="outlined">
            Back
          </Button>
        )}
        <Button disabled={!isValid} type="submit" variant="contained">
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default TemplateForm;
