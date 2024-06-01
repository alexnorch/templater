import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { Grid, Stack, Button, Typography } from "@mui/material";

import { useGetAttributesQuery } from "../../api/attributeApi";
import { ITemplateItem, IAttributeOption } from "../../types";
import { useGetCategoriesQuery } from "../../api/categoryApi";
import { FormSelectField, FormTextField, FormTextEditor } from "../ui";
import { formatTemplateData } from "../../utils/helpers";

interface TemplateFormProps {
  mode: "edit" | "create";
  values: ITemplateItem;
  onSubmit: (data: ITemplateItem) => void;
  isLoading: boolean;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
  mode,
  values,
  onSubmit,
  isLoading,
}) => {
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: attributesList = [] } = useGetAttributesQuery();

  const methods = useForm({ defaultValues: values });
  const navigate = useNavigate();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const isSubmitDisabled = !isValid || isLoading;

  useEffect(() => {
    setDefaultAttributeValues();
  }, []);

  const setDefaultAttributeValues = () => {
    if (mode === "edit") {
      if (Array.isArray(values.attributeValues)) {
        values.attributeValues.forEach((item: IAttributeOption) => {
          const lowerLabel = (item.attribute as string).toLowerCase();
          setValue(`attributeValues.${lowerLabel}`, item._id);
        });
      }
    }
  };

  const submitForm: SubmitHandler<ITemplateItem> = (data) => {
    onSubmit(formatTemplateData(data));
  };

  const attributes = attributesList.map(({ label, values, _id }) => {
    const labelLowerCase = label.toLowerCase();

    const name = `attributeValues.${labelLowerCase}` as keyof ITemplateItem;

    return (
      <Grid item xs={5.5} sm={4} key={_id}>
        <FormSelectField
          control={control}
          name={name}
          label={label}
          values={values}
        />
      </Grid>
    );
  });

  return (
    <Stack onSubmit={handleSubmit(submitForm)} spacing={2} component="form">
      <Stack spacing={2} sx={{ maxHeight: "60vh", overflowY: "scroll" }}>
        <Stack flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          <FormTextField control={control} name="title" label="Title" />
          <FormSelectField
            control={control}
            name="category"
            label="Category"
            values={categories}
          />
        </Stack>

        <FormTextEditor control={control} name="text" />

        <Stack>
          <Typography mb={1}>Additional fields (attributes):</Typography>
          <Grid container gap={2}>
            {attributes}
          </Grid>
        </Stack>
      </Stack>
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
        <Button disabled={isSubmitDisabled} type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default TemplateForm;
