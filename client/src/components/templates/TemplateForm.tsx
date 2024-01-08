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

interface IFormInputs {
  title: string;
  category: string;
  language: string;
  gender: string;
  text: string;
}

interface ITemplateForm {
  heading: string;
  onSubmit: (data: IFormInputs) => void;
  values: IFormInputs;
}

const TemplateForm: React.FC<ITemplateForm> = (props) => {
  const { heading, onSubmit, values } = props;
  const { genderOptions, languageOptions } = useSelector(
    (state: RootState) => state.templates
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ values });

  const onSubmitForm: SubmitHandler<IFormInputs> = (data) => {
    onSubmit(data);
  };

  // Rules
  const required = "The field is required";

  return (
    <Stack
      onSubmit={handleSubmit(onSubmitForm)}
      my={2}
      minWidth={800}
      spacing={2}
      component="form"
    >
      <Typography component="h4" variant="h5">
        {heading}
      </Typography>

      {/* Template Title */}
      <Controller
        name="title"
        control={control}
        rules={{ required }}
        render={({ field, fieldState: { invalid } }) => (
          <TextField
            {...field}
            error={invalid}
            // helperText={errors?.title?.message}
            label="Template title"
            variant="filled"
          />
        )}
      />
      {/* Template Category */}

      {/* <Controller
        name="category"
        control={control}
        rules={{ required }}
        render={({ field, fieldState: { invalid } }) => (
          <FormControl variant="filled" fullWidth>
            <InputLabel error={invalid}>Category</InputLabel>
            <Select error={invalid} {...field} label="Category">
              {categories.map((item) => (
                <MenuItem key={item._id} value={item.title}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={invalid}>
              {errors?.category?.message}
            </FormHelperText>
          </FormControl>
        )}
      /> */}

      <Stack flexDirection="row" sx={{ gap: 2 }}>
        {/* Template Language */}
        <Controller
          name="language"
          control={control}
          rules={{ required }}
          render={({ field, fieldState: { invalid } }) => (
            <FormControl variant="filled" fullWidth>
              <InputLabel error={invalid}>Language</InputLabel>
              <Select {...field} error={invalid} name="language">
                {languageOptions.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
              <FormHelperText error={invalid}>
                {/* {errors?.language?.message} */}
              </FormHelperText>
            </FormControl>
          )}
        />

        {/* Template Gender */}
        <Controller
          name="gender"
          control={control}
          rules={{ required }}
          render={({ field, fieldState: { invalid } }) => (
            <FormControl variant="filled" fullWidth>
              <InputLabel error={invalid}>Gender</InputLabel>
              <Select {...field} error={invalid} label="Gender">
                {genderOptions.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
              <FormHelperText error={invalid}>
                {/* {errors?.gender?.message} */}
              </FormHelperText>
            </FormControl>
          )}
        />
      </Stack>
      {/* Template Text */}
      <Controller
        name="text"
        control={control}
        rules={{ required }}
        render={({ field, fieldState: { invalid } }) => (
          <TextField
            {...field}
            error={invalid}
            // helperText={errors?.text?.message}
            label="Template text"
            multiline
            minRows={8}
            maxRows={12}
          />
        )}
      />

      <Stack alignItems="flex-end">
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default TemplateForm;
