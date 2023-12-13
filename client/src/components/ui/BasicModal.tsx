import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

interface BasicModalProps {
  label?: string;
  description?: string;
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const BasicModal: React.FC<BasicModalProps> = ({
  children,
  isOpen,
  handleClose,
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
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default BasicModal;
