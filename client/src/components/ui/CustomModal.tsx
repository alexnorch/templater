import { Modal, Box, Typography } from "@mui/material";
import { SxProps } from "@mui/material";

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
      <Box sx={Object.assign(defaultStyles, sx)}>
        <Typography component="h4" variant="h6" mb={2}>
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
