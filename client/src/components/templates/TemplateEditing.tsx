import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import BasicModal from "../ui/BasicModal";
import TemplateForm from "./TemplateForm";
import { ITemplateItem } from "../../types";
import { setIsTemplateEditing } from "../../store/reducers/templatesSlice";

import useTemplateServices from "../../services/useTemplateServices";

const TemplateEditing = () => {
  const { singleTemplate, isTemplateEditing } = useSelector(
    (state: RootState) => state.templates
  );

  const { onUpdateTemplate } = useTemplateServices();

  const dispatch = useDispatch();

  const finishTemplateEditing = () => {
    dispatch(setIsTemplateEditing(false));
  };

  const handleUpdateTemplate = (data: ITemplateItem) => {
    onUpdateTemplate(singleTemplate._id, data);
    finishTemplateEditing();
  };

  return (
    <BasicModal isOpen={isTemplateEditing} handleClose={finishTemplateEditing}>
      <TemplateForm
        heading="Edit template"
        onSubmit={handleUpdateTemplate}
        values={singleTemplate}
      />
    </BasicModal>
  );
};

export default TemplateEditing;
