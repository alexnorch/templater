import { Modal, Box, Typography } from "@mui/material";

interface CustomModalProps {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const CustomModal: React.FC<CustomModalProps> = ({
  children,
  isOpen,
  handleClose,
  title,
}) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <Typography component="h4" variant="h6" mb={2}>
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
