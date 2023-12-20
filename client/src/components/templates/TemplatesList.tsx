import { Grid, Typography } from "@mui/material";
import TemplateItem from "./TemplateItem";

interface ITemplateItem {
  _id: string;
  title: string;
  language: string;
  gender: string;
  text: string;
}

const TemplatesList: React.FC<{ templates: ITemplateItem[] }> = ({
  templates,
}) => {
  if (!templates || templates.length < 1) {
    return <Typography>No templates found</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {templates.map(({ title, text, gender, language, _id }) => (
        <Grid key={_id} item md={4}>
          <TemplateItem
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
