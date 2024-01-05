import { useDispatch, useSelector } from "react-redux";

import { setSelectedTemplateId } from "../../store/reducers/templateReducer";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ITemplateItem } from "../../types";

import { RootState } from "../../store";

const TemplateItem: React.FC<ITemplateItem> = (props) => {
  const { _id, title } = props;
  const { selectedTemplateId } = useSelector(
    (state: RootState) => state.template
  );

  const dispatch = useDispatch();

  return (
    <>
      <Box
        onClick={() => dispatch(setSelectedTemplateId(_id!))}
        sx={{
          borderRadius: 1,
          backgroundColor: _id === selectedTemplateId ? "#1976d2" : "#bbb",
          color: _id === selectedTemplateId ? "#fff" : "#333",
          padding: 2,
          cursor: "pointer",
          border: "1px solid transparent",
          "&:hover": {
            backgroundColor: "#1976d2",
            color: "#fff",
          },
        }}
      >
        <Typography variant="body1" component="h5">
          {title}
        </Typography>
      </Box>
    </>
  );
};

export default TemplateItem;
