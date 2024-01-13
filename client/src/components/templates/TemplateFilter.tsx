import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, Grid } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { RootState } from "../../store";
import { setAttributesValues } from "../filters/filterSlice";
import FilterSelect from "../filters/FilterSelect";

// Filter components
import CategoryFilter from "../filters/CategoryFilter";
import SearchInput from "../filters/SearchInput";

const selectCustomAttributes = (state: RootState) =>
  state.filter.customAttributes;

const selectAttributeValues = (state: RootState) =>
  state.filter.attributesValues as { [key: string]: string };

const TemplateFilter = () => {
  const attributesValues = useSelector(selectAttributeValues);
  const customAttributes = useSelector(selectCustomAttributes);
  const dispatch = useDispatch();

  const handleAttributeChange = (label: string, selectedValue: string) => {
    dispatch(
      setAttributesValues({ ...attributesValues, [label]: selectedValue })
    );
  };

  const customFilterSelects = customAttributes.map(
    ({ label, options }, index) => (
      <FilterSelect
        key={index}
        label={label}
        options={options}
        onChange={(e: SelectChangeEvent) =>
          handleAttributeChange(label, e.target.value)
        }
        value={attributesValues[label] || ""}
      />
    )
  );

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
