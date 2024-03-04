import { Typography, Stack } from "@mui/material";
import { AttributeAdd, AttributesList } from "../../components/attributes";

import { CustomTooltip } from "../../components/ui";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const attributesTooltip =
  "Attributes add extra details to templates, enabling easy filtering not just by categories, but also by other criteria like language.";

const AttributesSettings: React.FC = () => {
  return (
    <>
      <Stack flexDirection="row" alignItems="center" gap={1} mb={2}>
        <Typography variant="h5">My Attributes</Typography>
        <CustomTooltip title={attributesTooltip}>
          <InfoOutlinedIcon />
        </CustomTooltip>
      </Stack>
      <AttributesList />
      <AttributeAdd />
    </>
  );
};

export default AttributesSettings;
