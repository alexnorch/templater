import { useState } from "react";
import AddButton from "../ui/AddButton";
import BasicModal from "../ui/BasicModal";
import AttributeForm from "./AttributeForm";
import { useAddAttributeMutation } from "./attributeSlice";

const defaultValues = {
  label: "",
};

const AttributeAdd = () => {
  const [isModal, setIsModal] = useState(false);
  const [createAttribute] = useAddAttributeMutation();

  const handleToggleModal = () => setIsModal((prev) => !prev);

  const onAddAttribute = async (data: any) => {
    await createAttribute(data);
    handleToggleModal();
  };

  return (
    <>
      <AddButton onClick={handleToggleModal} />
      <BasicModal
        title="Create Attribute"
        isOpen={isModal}
        handleClose={handleToggleModal}
      >
        <AttributeForm onSubmit={onAddAttribute} values={defaultValues} />
      </BasicModal>
    </>
  );
};

export default AttributeAdd;
