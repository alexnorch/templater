import { useState } from "react";
import { Chip } from "@mui/material";

import { useDeleteAttributeOptionMutation } from "../../components/attributes/attributeSlice";
import ConfirmDialog from "../ui/ConfirmDialog";

interface AttributeValueProps {
  value: string;
  attrId: string;
  optionId: string;
}

const AttributeValue: React.FC<AttributeValueProps> = (props) => {
  const { value, attrId, optionId } = props;
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteAttributeOption] = useDeleteAttributeOptionMutation();

  const handleToggleDeleting = () => setIsDeleting((prev) => !prev);

  const onDeleteOptionAttribute = async () => {
    await deleteAttributeOption({ attrId, optionId });
  };

  return (
    <>
      <Chip label={value} onDelete={handleToggleDeleting} />
      <ConfirmDialog
        handleSubmit={onDeleteOptionAttribute}
        handleClose={handleToggleDeleting}
        isOpen={isDeleting}
        title="Delete Attribute Option"
        text={`Are you sure you want to dele this attribute option - ${value}?`}
      />
    </>
  );
};

export default AttributeValue;
