import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";

import {
  Stack,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";

import { IAttribute } from "../../types";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface IAttributeForm {
  formData: IAttribute;
  onSubmit: (data: IAttribute) => void;
  isLoading: boolean;
}

const AttributeForm: React.FC<IAttributeForm> = ({
  formData,
  onSubmit,
  isLoading,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ values: formData });

  const {
    fields = [],
    remove,
    append,
  } = useFieldArray({
    name: "values",
    rules: { required: "Attribute Option is required" },
    control,
  });

  const attrOptionErrMsg = errors.values?.root?.message;

  const onSubmitForm: SubmitHandler<IAttribute> = (data) => {
    onSubmit(data);
  };

  return (
    <Stack
      onSubmit={handleSubmit(onSubmitForm)}
      alignItems="start"
      spacing={2}
      component="form"
      height="100%"
    >
      <Typography>Label:</Typography>
      <Controller
        name="label"
        control={control}
        rules={{ required: "The field is required" }}
        render={({ field, fieldState: { invalid } }) => (
          <TextField
            {...field}
            fullWidth
            error={invalid}
            size="small"
            placeholder="Attribute Label"
            helperText={errors?.label?.message?.toString()}
          />
        )}
      />

      <Typography>Options:</Typography>

      {!!attrOptionErrMsg && (
        <Typography fontSize={12} color="error">
          {attrOptionErrMsg}
        </Typography>
      )}

      <Stack spacing={2} width={1} maxHeight={200} overflow="auto">
        {fields.map((item, index) => (
          <Stack flexDirection="row" alignItems="flex-start" key={item.id}>
            <Controller
              name={`values.${index}.value`}
              control={control}
              rules={{ required: "The field is required" }}
              render={({ field, fieldState: { invalid } }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Attribute Value"
                  error={invalid}
                  helperText={errors?.values?.[
                    index
                  ]?.value?.message?.toString()}
                  size="small"
                  {...field}
                />
              )}
            />
            <IconButton
              color="error"
              disableRipple
              onClick={() => remove(index)}
            >
              <RemoveIcon />
            </IconButton>
          </Stack>
        ))}
      </Stack>

      <IconButton onClick={() => append({ value: "" })}>
        <AddIcon />
      </IconButton>

      <Stack width={1} alignItems="flex-end">
        <Button disabled={isLoading} type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default AttributeForm;
