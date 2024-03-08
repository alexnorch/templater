import { useState } from "react";
import AddButton from "../ui/AddButton";
import BasicModal from "../ui/CustomModal";
import AttributeForm from "./AttributeItemForm";
import { useAddAttributeMutation } from "../../api/attributeApi";

const defaultValues = {
  label: "",
};

const AttributeAdd = () => {
  const [isModal, setIsModal] = useState(false);
  const [createAttribute, { isLoading }] = useAddAttributeMutation();

  const handleToggleModal = () => setIsModal((prev) => !prev);

  const onAddAttribute = async (data: any) => {
    await createAttribute(data).unwrap();
    handleToggleModal();
  };

  return (
    <>
      <AddButton onClick={handleToggleModal} />
      <BasicModal
        sx={{ maxWidth: 400 }}
        title="Create Attribute"
        isOpen={isModal}
        handleClose={handleToggleModal}
      >
        <AttributeForm
          onSubmit={onAddAttribute}
          values={defaultValues}
          isLoading={isLoading}
        />
      </BasicModal>
    </>
  );
};

export default AttributeAdd;
