import { Stack, Box } from "@mui/material";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import "./TextEditor.css";

import { BlockStyleControls } from "./BlockStylesControls";
import { InlineStyleControls } from "./InlineStylesControls";

import { styled } from "@mui/system";

const ControllersContainer = styled(Stack)({
  gap: "5px",
  flexDirection: "row",
  padding: "10px",
  borderBottom: "1px solid rgba(0,0,0,0.2);",
});

const EditorContainer = styled(Box)({
  height: 400,
  overflowY: "auto",
});

interface TextEditorProps {
  isError?: boolean;
  state: EditorState;
  onChange: (value: EditorState) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  state,
  isError,
  onChange,
}) => {
  const handleChangeText = (value: EditorState) => {
    onChange(value);
  };

  const handleToggleInlineStyles = (inlineStyle: string) => {
    const newState = RichUtils.toggleInlineStyle(state, inlineStyle);
    onChange(newState);
  };

  const handleToggleBlockTypes = (blockType: string) => {
    const newState = RichUtils.toggleBlockType(state, blockType);
    onChange(newState);
  };

  const borderStyles = isError
    ? "1px solid #d32f2f"
    : "1px solid rgba(0,0,0,0.2)";

  return (
    <Stack sx={{ border: borderStyles, borderRadius: 1 }}>
      <ControllersContainer>
        <InlineStyleControls
          onToggle={handleToggleInlineStyles}
          editorState={state}
        />
        <BlockStyleControls
          onToggle={handleToggleBlockTypes}
          editorState={state}
        />
      </ControllersContainer>
      <EditorContainer>
        <Editor editorState={state} onChange={handleChangeText} />
      </EditorContainer>
    </Stack>
  );
};

export default TextEditor;
