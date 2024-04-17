import { useSelector, useDispatch } from "react-redux";
import { SelectChangeEvent, Grid } from "@mui/material";
import { AttributeSelect } from "../attributes";
import {
    selectAttributeLabels,
    selectAttributesValues,
    setAttributesValues
} from "../../store/slices/filterSlice";

const FilterByAttributeValue: React.FC = () => {
    const selectedAttributes = useSelector(selectAttributeLabels)
    const attributeValues = useSelector(selectAttributesValues)

    const dispatch = useDispatch();

    const renderedAttributes = selectedAttributes.map(({ label, values, _id }) => {
        const onSelectAttribute = (e: SelectChangeEvent) => {
            dispatch(setAttributesValues({ [label]: e.target.value }));
        };

        return (
            <Grid item md={1}>
                <AttributeSelect
                    _id={_id}
                    onChange={onSelectAttribute}
                    value={attributeValues[label] || ""}
                    label={label}
                    values={values}
                />
            </Grid>
        );
    });

    return (
        <Grid container spacing={2}>
            {renderedAttributes}
        </Grid>
    )
}
export default FilterByAttributeValue