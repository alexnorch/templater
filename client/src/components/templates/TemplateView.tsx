import { useState } from "react"
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux"
import { selectCurrentTemplate, setSelectedTemplate } from "../../store/slices/templateSlice"
import { IAttributeOption, ITemplateItem } from "../../types"
import { TemplatePlaceholder, TemplateDetails, TemplateForm } from "."
import { useDeleteTemplateMutation, useUpdateTemplateMutation } from "../../api/templateApi"
import { ConfirmDialog, CustomModal } from "../ui";
import { EditorState } from "draft-js";
import { ScrollContainer } from "../ui";
import { formatTemplateData } from "../../utils/helpers";

const TemplateView: React.FC = () => {
    const [shouldDelete, setShouldDelete] = useState(false)
    const [shouldEdit, setShouldEdit] = useState(false)
    const selectedTemplate = useSelector(selectCurrentTemplate) as ITemplateItem;

    const [deleteTemplate] = useDeleteTemplateMutation();
    const [updateTemplate, { isLoading: isUpdateLoading }] = useUpdateTemplateMutation();

    const dispatch = useDispatch();
    const handleToggleDeleting = () => setShouldDelete((prev) => !prev);
    const handleToggleEditing = () => setShouldEdit((prev) => !prev)

    if (!selectedTemplate) return <TemplatePlaceholder />

    const onDeleteTemplate = async () => {
        await deleteTemplate(selectedTemplate._id).unwrap();

        dispatch(setSelectedTemplate(null))

        setShouldDelete(false);
        toast.success("Successfully deleted");
    };

    const onEditTemplate = async (data: ITemplateItem) => {
        const formattedData = formatTemplateData(data)
        const updatedValue = await updateTemplate(formattedData).unwrap()

        dispatch(setSelectedTemplate(updatedValue))
        handleToggleEditing()
    }

    const handleCopyText = (editorState: EditorState) => {
        const contentState = editorState.getCurrentContent();
        const text = contentState.getPlainText();

        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <ScrollContainer height='100%'>
                <TemplateDetails
                    title={selectedTemplate.title}
                    text={selectedTemplate.text}
                    attributeValues={selectedTemplate.attributeValues as IAttributeOption[]}
                    onStartDeleting={handleToggleDeleting}
                    onStartEditing={handleToggleEditing}
                    onCopyText={handleCopyText}
                />
            </ScrollContainer>

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
                    data={selectedTemplate}
                    onSubmit={onEditTemplate} />
            </CustomModal>
        </>
    )
}
export default TemplateView