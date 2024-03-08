import { useDispatch, useSelector } from "react-redux";
import { Grid, SelectChangeEvent, IconButton, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { AttributeSelect } from "../attributes";
import { useGetAttributesQuery } from "../../api/attributeApi";
import { setAttributesValues, selectAttributesValues } from "../../store/slices/filterSlice";

const FilterByAttribute = () => {
  const attributesValues = useSelector(selectAttributesValues);
  const dispatch = useDispatch();

  const { data: attributesList = [] } = useGetAttributesQuery();

  const renderedAttributes = attributesList.map(({ label, values, _id }) => {
    const onSelectAttribute = (e: SelectChangeEvent) => {
      dispatch(setAttributesValues({ [label]: e.target.value }));
    };

    const resetAttribute = () => {
      dispatch(setAttributesValues({ [label]: "" }));
    };

    return (
      <Grid item key={_id} md={6}>
        <Stack flexDirection='row' alignItems='center' gap={1}>
          <AttributeSelect
            _id={_id}
            onChange={onSelectAttribute}
            value={attributesValues[label] || ""}
            label={label}
            values={values}
          />
          <IconButton onClick={resetAttribute}>
            <ClearIcon sx={{ width: 15, height: 15 }} />
          </IconButton>
        </Stack>
      </Grid>
    );
  });

  return (
    <Grid container spacing={2} direction="row" flexWrap="wrap">
      {renderedAttributes}
    </Grid>
  );
};

export default FilterByAttribute;
