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

interface TextEditorProps {
  state: EditorState;
  onChange: (value: EditorState) => void;
}

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
    <Stack sx={{ border: "1px solid rgba(0,0,0,0.2)" }}>
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
      <Box
        sx={{
          height: 400,
          overflowY: "auto",
        }}
      >
        <Editor editorState={state} onChange={handleChangeText} />
      </Box>
    </Stack>
  );
};

export default TextEditor;
