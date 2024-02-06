import { Modal, Box, Typography } from "@mui/material";

interface IBasicModal {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const BasicModal: React.FC<IBasicModal> = ({
  children,
  isOpen,
  handleClose,
  title,
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

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

export default BasicModal;
