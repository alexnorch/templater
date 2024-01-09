import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../ui/ConfirmDialog";
import { RootState } from "../../store";

import { setIsTemplateDeleting } from "../../store/reducers/templatesSlice";
import useTemplateServices from "../../services/useTemplateServices";

const TemplateDeleting = () => {
  const { singleTemplate, isTemplateDeleting } = useSelector(
    (state: RootState) => state.templates
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { onDeleteTemplate } = useTemplateServices();

  const finishTemplateDeleting = () => {
    dispatch(setIsTemplateDeleting(false));
  };

  const handleDeleteTemplate = () => {
    onDeleteTemplate(singleTemplate._id);
    finishTemplateDeleting();
    navigate("/templates");
  };

  return (
    <ConfirmDialog
      title="Template deleting"
      text="Are you sure you want to delete this template?"
      isOpen={isTemplateDeleting}
      handleClose={finishTemplateDeleting}
      handleSubmit={handleDeleteTemplate}
    />
  );
};

export default TemplateDeleting;
