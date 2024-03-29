import { useDispatch, useSelector } from "react-redux";
import { Grid, SelectChangeEvent } from "@mui/material";

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

    return (
      <Grid item key={_id} md={6}>
        <AttributeSelect
          _id={_id}
          onChange={onSelectAttribute}
          value={attributesValues[label] || ""}
          label={label}
          values={values}
        />
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
