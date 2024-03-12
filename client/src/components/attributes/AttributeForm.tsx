import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Stack, TextField, Button } from "@mui/material";

interface IAttributeItemForm {
  values: { [key: string]: any };
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const AttributeItemForm: React.FC<IAttributeItemForm> = ({
  values,
  onSubmit,
  isLoading,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ values });

  const onSubmitForm: SubmitHandler<any> = (data) => {
    onSubmit(data);
  };

  return (
    <Stack
      onSubmit={handleSubmit(onSubmitForm)}
      alignItems="start"
      spacing={2}
      component="form"
    >
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
      <Button
        disabled={isLoading}
        fullWidth
        type="submit"
        variant="contained">
        Submit
      </Button>
    </Stack>
  );
};

export default AttributeItemForm;
