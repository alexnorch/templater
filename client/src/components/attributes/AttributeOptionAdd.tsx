import { ChangeEvent, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Chip, TextField, Stack, Button } from "@mui/material";
import BasicModal from "../ui/CustomModal";

import { useAddAttributeOptionMutation } from "../../api/attributeApi";

interface AttributeOptionAddProps {
  attributeId: string;
}

const AttributeOptionAdd: React.FC<AttributeOptionAddProps> = ({ attributeId }) => {
  const [isModal, setIsModal] = useState(false);
  const [attributeValue, setAttributeValue] = useState("");
  const [addAttributeValue] = useAddAttributeOptionMutation();

  const handleModalToggle = () => setIsModal((prev) => !prev);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAttributeValue(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await addAttributeValue({ attributeId, value: attributeValue });

    handleModalToggle();
    setAttributeValue("");
  };

  return (
    <>
      <Chip icon={<AddIcon />} label="Add" onClick={handleModalToggle} />
      <BasicModal
        title="Create Attribute Value"
        isOpen={isModal}
        handleClose={handleModalToggle}
      >
        <Stack p={2} onSubmit={handleSubmit} component="form" spacing={2}>
          <TextField
            size="small"
            onChange={handleChange}
            fullWidth
            value={attributeValue}
            placeholder="Attribute Value"
          />
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Stack>
      </BasicModal>
    </>
  );
};

export default AttributeOptionAdd;
