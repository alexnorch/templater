import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddButton: React.FC<any> = ({ onClick }) => {
  const styles = { position: "fixed", bottom: 25, right: 25 };

  return (
    <Fab onClick={onClick} sx={styles} color="primary">
      <AddIcon />
    </Fab>
  );
};

export default AddButton;
