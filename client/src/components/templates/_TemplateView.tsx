import { useState } from "react"
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectHoveredTemplate, selectPinnedTemplate, setPinnedTemplate } from "../../store/slices/templateSlice"
import { IAttributeValue } from "../../types"
import { TemplatePlaceholder, TemplateDetails } from "../templates"
import { useDeleteTemplateMutation } from "../../api/templateApi"
import { ConfirmDialog } from "../ui";

const _TemplateView = () => {
    const [shouldDelete, setShouldDelete] = useState(false)
    const hoveredTemplate = useSelector(selectHoveredTemplate);
    const pinnedTemplate = useSelector(selectPinnedTemplate)
    const [deleteTemplate] = useDeleteTemplateMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!hoveredTemplate) {
        return <TemplatePlaceholder />
    }

    const template = pinnedTemplate || hoveredTemplate
    const handleToggleDeleting = () => setShouldDelete((prev) => !prev);
    const handleStartEditing = () => navigate(`${template._id}/edit`);

    const onDeleteTemplate = async () => {
        await deleteTemplate(template._id).unwrap();
        setShouldDelete(false);
        navigate("/templates");

        if (pinnedTemplate?._id === template._id) {
            dispatch(setPinnedTemplate(null))
        }

        toast.success("Successfully deleted");
    };

    return (
        <>
            <TemplateDetails
                title={template.title}
                text={template.text}
                attributeValues={template.attributeValues as IAttributeValue[]}
                onStartDeleting={handleToggleDeleting}
                onStartEditing={handleStartEditing}
            />

            <ConfirmDialog
                title="Template deleting"
                text="Are you sure you want to delete this template?"
                isOpen={shouldDelete}
                handleClose={handleToggleDeleting}
                handleSubmit={onDeleteTemplate}
            />
        </>
    )
}
export default _TemplateView