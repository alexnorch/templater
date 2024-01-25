import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  Box,
  Stack,
  Grid,
  SelectChangeEvent,
  TextField,
  IconButton,
} from "@mui/material";

// Filter components
import CategoryFilter from "./CategoryFilter";

import AttributeSelect from "../attributes/AttributeSelect";

import { useGetAttributesQuery } from "../attributes/attributeSlice";
import { setAttributesValues } from "./filterSlice";

import ClearIcon from "@mui/icons-material/Clear";

const selectAttributesValues = (state: RootState) => state.filter.attributes;

const TemplateFilter = () => {
  const attributesValues = useSelector(selectAttributesValues);
  const { data: attributesList, isSuccess } = useGetAttributesQuery();
  const dispatch = useDispatch();

  if (!isSuccess) return;

  const renderedAttributes = attributesList.map(({ label, values, _id }) => {
    const onSelectAttribute = (e: SelectChangeEvent) => {
      dispatch(setAttributesValues({ [label]: e.target.value }));
    };

    const resetAttribute = () => {
      dispatch(setAttributesValues({ [label]: "" }));
    };

    return (
      <Stack key={_id} flexDirection="row" alignItems="flex-start">
        <AttributeSelect
          _id={_id}
          onChange={onSelectAttribute}
          value={attributesValues[label] || ""}
          label={label}
          values={values}
        />
        <IconButton onClick={resetAttribute} size="small">
          <ClearIcon />
        </IconButton>
      </Stack>
    );
  });

  return (
    <Box mb={4}>
      <Grid container mb={2} justifyContent="space-between">
        <Grid item md={4}>
          <TextField
            fullWidth
            size="small"
            value=""
            label="Template title"
            variant="standard"
          />
        </Grid>
        <Stack
          spacing={5}
          direction="row"
          alignItems="flex-end"
          flexWrap="wrap"
        >
          {renderedAttributes}
        </Stack>
      </Grid>
      <CategoryFilter />
    </Box>
  );
};

export default TemplateFilter;
