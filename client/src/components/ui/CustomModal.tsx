import { Modal, Box, Typography, Stack, IconButton } from "@mui/material";
import { SxProps } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CustomModalProps {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  sx?: SxProps;
}

const defaultStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 1,
  p: 3,
};

const CustomModal: React.FC<CustomModalProps> = ({
  children,
  isOpen,
  handleClose,
  title,
  sx,
}) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Stack sx={Object.assign(defaultStyles, sx)}>
        <Stack
          mb={2}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography component="h4" variant="h6">
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box>{children}</Box>
      </Stack>
    </Modal>
  );
};

export default CustomModal;
