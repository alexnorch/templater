import { useState, useEffect } from "react";
import TextEditor from "./TextEditor/TextEditor";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { UseControllerProps, useController } from "react-hook-form";
import { ITemplateItem } from "../../types";

const getTextEditorContent = (content: string) => {

  if (typeof content !== "string")
    return EditorState.createWithContent(convertFromRaw(content));

  return content
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
    : EditorState.createEmpty();
};

const FormTextEditor: React.FC<UseControllerProps<ITemplateItem>> = ({
  name,
  control,
}) => {
  const { field } = useController({
    name,
    control,
    rules: { required: true },
  });


  const [editorState, setEditorState] = useState(() =>
    getTextEditorContent(field.value as string)
  );

  useEffect(() => {
    if (control) {
      control.register(name);
    }
  }, [control, name]);

  const handleChangeText = (state: EditorState) => {
    setEditorState(state);

    const currentContent = state.getCurrentContent();
    const convertedData = convertToRaw(currentContent);

    field.onChange(convertedData);
  };

  return <TextEditor onChange={handleChangeText} state={editorState} />;
};

export default FormTextEditor;
