import { useState } from "react";
import { Chip } from "@mui/material";

import { useDeleteAttributeOptionMutation } from "../../api/attributeApi";
import ConfirmDialog from "../ui/ConfirmDialog";

interface AttributeOptionProps {
  value: string;
  attributeId: string;
  optionId: string;
}

const AttributeOption: React.FC<AttributeOptionProps> = ({
  value,
  attributeId,
  optionId,
}) => {

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteAttributeOption] = useDeleteAttributeOptionMutation();

  const handleToggleDeleting = () => setIsDeleting((prev) => !prev);

  const onDeleteOptionAttribute = async () => {
    await deleteAttributeOption({ attributeId, optionId });
  };

  return (
    <>
      <Chip label={value} />

      {/* Deleting Attribute Value */}
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

export default AttributeOption;
