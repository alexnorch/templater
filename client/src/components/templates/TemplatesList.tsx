import { Grid, Typography } from "@mui/material";
import TemplateItem from "./TemplateItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const TemplatesList = () => {
  const { templates } = useSelector((state: RootState) => state.template);

  if (!templates || templates.length < 1) {
    return <Typography>No templates found</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {templates.map(({ title, text, gender, language, _id, category }) => (
        <Grid key={_id} item md={4}>
          <TemplateItem
            category={category.title}
            _id={_id}
            title={title}
            text={text}
            language={language}
            gender={gender}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TemplatesList;
