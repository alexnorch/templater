import { useDispatch, useSelector } from "react-redux";
import { Stack, SelectChangeEvent, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { RootState } from "../../store";

import { AttributeSelect } from "../attributes";
import { useGetAttributesQuery } from "../../api/attributeApi";
import { setAttributesValues } from "../../store/slices/filterSlice";

const selectAttributesValues = (state: RootState) => state.filter.attributes;

const FilterByAttribute = () => {
  const attributesValues = useSelector(selectAttributesValues);
  const { data: attributesList = [] } = useGetAttributesQuery();
  const dispatch = useDispatch();

  const renderedAttributes = attributesList.map(({ label, values, _id }) => {
    const onSelectAttribute = (e: SelectChangeEvent) => {
      dispatch(setAttributesValues({ [label]: e.target.value }));
    };

    const resetAttribute = () => {
      dispatch(setAttributesValues({ [label]: "" }));
    };

    return (
      <Stack
        key={_id}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
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
    <Stack spacing={2} direction="row" alignItems="flex-end" flexWrap="wrap">
      {renderedAttributes}
    </Stack>
  );
};

export default FilterByAttribute;
