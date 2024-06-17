import { useState } from "react";
import { CustomModal, AddButton } from "../ui";
import { AttributeForm } from ".";
import { useAddAttributeMutation } from "../../api/attributeApi";

const defaultValues = {
  label: "",
  values: [],
};

const AttributeAdd: React.FC = () => {
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
      <CustomModal
        sx={{ maxWidth: 400, width: "100%" }}
        title="Create Attribute"
        isOpen={isModal}
        handleClose={handleToggleModal}
      >
        <AttributeForm
          onSubmit={onAddAttribute}
          formData={defaultValues}
          isLoading={isLoading}
        />
      </CustomModal>
    </>
  );
};

export default AttributeAdd;
