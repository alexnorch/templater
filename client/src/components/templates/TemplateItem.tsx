import { useState } from "react";

// External components
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";

// Internal components
import BasicModal from "../ui/BasicModal";
import TemplateForm from "./TemplateForm";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Utils
import { displayGenderIcon } from "../../utils/templateUtils";

type ActionType = "deleting" | "editing" | null;

const TemplateItem = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [action, setAction] = useState<ActionType>(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuAction = (action: ActionType) => {
    setAction(action);
    handleModalOpen();
    handleMenuClose();
  };

  const handleModalOpen = () => setIsModal(true);
  const handleModalClose = () => {
    setIsModal(false);
    setAction(null);
  };

  return (
    <>
      <Card>
        <CardActionArea>
          <CardHeader
            title="Withdraw under 500 EUR"
            action={
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          <Divider />
          <Stack
            p={1}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box component="span">{displayGenderIcon("male")}</Box>
            <Box component="span">PL</Box>
          </Stack>
        </CardActionArea>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem onClick={() => handleMenuAction("deleting")}>
            Delete
          </MenuItem>
          <MenuItem onClick={() => handleMenuAction("editing")}>Edit</MenuItem>
        </Menu>
      </Card>
      <BasicModal isOpen={isModal} handleClose={handleModalClose}>
        {action === "deleting" ? (
          <>
            <Typography variant="h6" component="h4">
              Are you sure you want to delete this category?
            </Typography>
            <Stack mt={2} alignItems="flex-end">
              <Button
                onClick={() => alert("Deleted")}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Typography component="h4" variant="h5">
              Edit template
            </Typography>
            <TemplateForm />
            <Stack alignItems="flex-end">
              <Button variant="contained">Submit</Button>
            </Stack>
          </>
        )}
      </BasicModal>
    </>
  );
};

export default TemplateItem;
