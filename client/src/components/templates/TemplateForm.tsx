import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";

import {
  Grid,
  Stack,
  FormHelperText,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import { useGetAttributesQuery } from "../../api/attributeApi";
import { ITemplateItem, IAttributeValue } from "../../types";
import { useGetCategoriesQuery } from "../../api/categoryApi";
import { NoCategoriesMessage } from "../categories";
import { FormSelectField, FormTextField, FormTextEditor } from "../ui";
import { formatTemplateData } from "../../utils/helpers";

interface TemplateFormProps {
  mode: "edit" | "create";
  values: ITemplateItem;
  onSubmit: (data: ITemplateItem) => void;
  isLoading: boolean;
}

type TabType = "content" | "attributes";

interface CustomFieldErrors extends FieldErrors<ITemplateItem> {
  attributeValues?: Record<string, { message: string }>;
  [key: string]: any;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
  mode,
  values,
  onSubmit,
  isLoading,
}) => {
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: attributesList = [] } = useGetAttributesQuery();
  const [activeTab, setActiveTab] = useState<TabType>("content");

  const methods = useForm({ defaultValues: values });
  const navigate = useNavigate();

  const isAttributesTabActive = activeTab === "attributes";
  const isContentTabActive = activeTab === "content";

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  useEffect(() => {
    setDefaultAttributeValues();
  }, []);

  const handleChangeTab = (
    _: React.MouseEvent<HTMLElement>,
    selectedTab: TabType
  ) => {
    setActiveTab(selectedTab);
  };

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
      <Grid item xs={5.5} sm={4} key={_id}>
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

  const contentTab = (
    <>
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
        <Button
          disabled={!isValid || isLoading}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </Stack>
    </>
  );

  const attributesTab = (
    <Grid container gap={2}>
      {renderedAttributes}
    </Grid>
  );

  return (
    <Stack
      minHeight="60vh"
      onSubmit={handleSubmit(submitForm)}
      spacing={2}
      component="form"
    >
      <ToggleButtonGroup
        size="small"
        value={activeTab}
        exclusive
        onChange={handleChangeTab}
      >
        <ToggleButton disabled={isContentTabActive} value="content">
          Content
        </ToggleButton>
        <ToggleButton disabled={isAttributesTabActive} value="attributes">
          Attributes
        </ToggleButton>
      </ToggleButtonGroup>

      {categories.length === 0 && <NoCategoriesMessage />}
      {activeTab === "content" && contentTab}
      {activeTab === "attributes" && attributesTab}
    </Stack>
  );
};

export default TemplateForm;
