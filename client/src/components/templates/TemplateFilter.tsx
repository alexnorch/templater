import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Box, Stack, Grid } from "@mui/material";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

// Filter components
import CategoryFilter from "../filters/CategoryFilter";
import SearchInput from "../filters/SearchInput";

import { useGetAttributesQuery } from "../attributes/attributesApi";
import { setAttributesValues } from "../filters/filterSlice";

const selectAttributesValues = (state: RootState) =>
  state.filter.attributesValues;

const TemplateFilter = () => {
  const { data: attributesList, isSuccess } = useGetAttributesQuery();
  const attributesValues = useSelector(selectAttributesValues);
  const dispatch = useDispatch();

  if (!isSuccess) return;

  const customFilterSelects = attributesList.map(({ label, options, _id }) => (
    <FormControl key={_id} size="small" variant="standard">
      <InputLabel>{label}</InputLabel>
      <Select
        onChange={(e: SelectChangeEvent) =>
          dispatch(setAttributesValues({ [label]: e.target.value }))
        }
        value={attributesValues[label] || ""}
        name={label}
        label={label}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option._id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ));

  return (
    <Box mb={2}>
      <Grid container mb={2} justifyContent="space-between">
        <Grid item md={4}>
          <SearchInput />
        </Grid>
        <Stack
          spacing={5}
          direction="row"
          alignItems="flex-end"
          flexWrap="wrap"
        >
          {customFilterSelects}
        </Stack>
      </Grid>
      <CategoryFilter />
    </Box>
  );
};

export default TemplateFilter;
