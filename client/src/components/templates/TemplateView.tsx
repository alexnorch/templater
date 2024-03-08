import { useState } from "react"
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux"
import { selectHoveredTemplate, setHoveredTemplate, setIsPinned } from "../../store/slices/templateSlice"
import { IAttributeValue, ITemplateItem } from "../../types"
import { TemplatePlaceholder, TemplateDetails, TemplateForm } from "."
import { useDeleteTemplateMutation, useUpdateTemplateMutation } from "../../api/templateApi"
import { ConfirmDialog, CustomModal } from "../ui";
import { EditorState } from "draft-js";

const TemplateView: React.FC = () => {
    const [shouldDelete, setShouldDelete] = useState(false)
    const [shouldEdit, setShouldEdit] = useState(false)
    const hoveredTemplate = useSelector(selectHoveredTemplate);

    const [deleteTemplate] = useDeleteTemplateMutation();
    const [updateTemplate, { isLoading: isUpdateLoading }] = useUpdateTemplateMutation();

    const dispatch = useDispatch();

    if (!hoveredTemplate) {
        return <TemplatePlaceholder />
    }

    const handleToggleDeleting = () => setShouldDelete((prev) => !prev);
    const handleToggleEditing = () => setShouldEdit((prev) => !prev)

    const onDeleteTemplate = async () => {
        await deleteTemplate(hoveredTemplate._id).unwrap();

        dispatch(setIsPinned(false))
        dispatch(setHoveredTemplate(null))

        setShouldDelete(false);
        toast.success("Successfully deleted");
    };

    const onEditTemplate = async (data: ITemplateItem) => {
        const updatedValue = await updateTemplate(data).unwrap()

        dispatch(setHoveredTemplate(updatedValue))
        handleToggleEditing()
    }

    const handleCopyText = (editorState: EditorState) => {
        const contentState = editorState.getCurrentContent();
        const text = contentState.getPlainText();

        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <TemplateDetails
                title={hoveredTemplate.title}
                text={hoveredTemplate.text}
                attributeValues={hoveredTemplate.attributeValues as IAttributeValue[]}
                onStartDeleting={handleToggleDeleting}
                onStartEditing={handleToggleEditing}
                onCopyText={handleCopyText}
            />

            <ConfirmDialog
                title="Template deleting"
                text="Are you sure you want to delete this template?"
                isOpen={shouldDelete}
                handleClose={handleToggleDeleting}
                handleSubmit={onDeleteTemplate}
            />

            <CustomModal
                title="Template Editing"
                isOpen={shouldEdit}
                handleClose={handleToggleEditing}>
                <TemplateForm
                    isLoading={isUpdateLoading}
                    mode="edit"
                    data={hoveredTemplate}
                    onSubmit={onEditTemplate} />
            </CustomModal>
        </>
    )
}
export default TemplateView