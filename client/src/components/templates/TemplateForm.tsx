import { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { Grid, Stack, FormHelperText, Button } from "@mui/material";

import { useGetAttributesQuery } from "../attributes/attributeApi";
import { ITemplateItem, IAttributeValue } from "../../types";
import { useGetCategoriesQuery } from "../categories/categoryApi";
import NoCategoriesMessage from "../categories/NoCategoriesMessage";
import FormSelectField from "../ui/FormSelectField";
import FormTextField from "../ui/FormTextField";

import { formatTemplateData } from "../../utils/helpers";

import TextEditor from "../ui/TextEditor/TextEditor";

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
  isLoading,
  onSubmit,
}) => {
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: attributesList = [] } = useGetAttributesQuery();

  const methods = useForm({ defaultValues: values });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
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
      <Grid item md={2.5} key={_id}>
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
    <Stack
      maxWidth={600}
      onSubmit={handleSubmit(submitForm)}
      spacing={2}
      component="form"
    >
      {categories.length === 0 && <NoCategoriesMessage />}

      {/* Title */}
      <FormTextField control={control} name="title" label="Title" />

      {/* Category */}
      <FormSelectField
        control={control}
        name="category"
        label="Category"
        values={categories}
      />

      {/* Text */}

      <TextEditor />
      {/* <FormTextField control={control} name="text" label="Text" /> */}

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
