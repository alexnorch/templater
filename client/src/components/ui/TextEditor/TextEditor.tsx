import { Stack, Box } from "@mui/material";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import "./TextEditor.css";

import { BlockStyleControls } from "./BlockStylesControls";
import { InlineStyleControls } from "./InlineStylesControls";

import { styled } from "@mui/system";

interface TextEditorProps {
  state: EditorState;
  onChange: (value: EditorState) => void;
}

const ControllersContainer = styled(Stack)({
  gap: "5px",
  flexDirection: "row",
  padding: "5px",
  borderBottom: "1px solid rgba(0,0,0,0.2);",
});

const EditorContainer = styled(Box)({
  height: "30vh",
  overflowY: "auto",
});

const TextEditor: React.FC<TextEditorProps> = ({ state, onChange }) => {
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

  return (
    <Stack
      sx={{
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: 1,
        maxWidth: "100%",
      }}
    >
      <ControllersContainer flexWrap={{ xs: "wrap" }}>
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
