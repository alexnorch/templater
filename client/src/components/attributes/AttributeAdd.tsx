import { useState } from "react";
import AddButton from "../ui/AddButton";
import BasicModal from "../ui/CustomModal";
import AttributeForm from "./AttributeForm";
import { useAddAttributeMutation } from "../../api/attributeApi";
import { formMode } from "../../types";

const defaultValues = {
  label: "",
  values: []
};

const AttributeAdd: React.FC = () => {
  const [isModal, setIsModal] = useState(false);
  const [createAttribute, { isLoading }] = useAddAttributeMutation();

  const handleToggleModal = () => setIsModal((prev) => !prev);

  const onAddAttribute = async (data: any) => {
    // await createAttribute(data).unwrap();
    // handleToggleModal();
    console.log(data)
  };

  return (
    <>
      <AddButton onClick={handleToggleModal} />
      <BasicModal
        sx={{ maxWidth: 400, width: '100%' }}
        title="Create Attribute"
        isOpen={isModal}
        handleClose={handleToggleModal}
      >
        <AttributeForm
          mode={formMode.create}
          onSubmit={onAddAttribute}
          formData={defaultValues}
          isLoading={isLoading}
        />
      </BasicModal>
    </>
  );
};

export default AttributeAdd;
