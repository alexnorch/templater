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
    <>
      <Typography mb={2} variant="body1" component="h4">
        Template List
      </Typography>
      <Grid spacing={2} container>
        {templates.map(({ title, text, gender, language, _id, category }) => (
          <Grid item md={6}>
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
    </>
  );
};

export default TemplatesList;
