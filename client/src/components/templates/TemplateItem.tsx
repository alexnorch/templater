import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { CardActionArea } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { displayGenderIcon } from "../../utils/templateUtils";

const TemplateItem = () => {
  return (
    <Card>
      <CardActionArea>
        <CardHeader
          title="Withdraw under 500 EUR"
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <Divider />
        <div className="template-item__properties">
          <p className="template-item__gender">{displayGenderIcon("male")}</p>
          <p className="template-item__language">PL</p>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default TemplateItem;
