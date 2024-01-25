import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Chip, TextField, Stack, Button } from "@mui/material";
import BasicModal from "../ui/BasicModal";

const AttributeValueAdd = () => {
  const [isModal, setIsModal] = useState(false);

  const handleModalToggle = () => setIsModal((prev) => !prev);

  return (
    <>
      <Chip icon={<AddIcon />} label="Add" onClick={handleModalToggle} />
      <BasicModal
        title="Create Attribute Value"
        isOpen={isModal}
        handleClose={handleModalToggle}
      >
        <Stack spacing={2}>
          <TextField
            fullWidth
            variant="filled"
            value="Test"
            label="Attribute Value"
          />
          <Button fullWidth>Submit</Button>
        </Stack>
      </BasicModal>
    </>
  );
};

export default AttributeValueAdd;
