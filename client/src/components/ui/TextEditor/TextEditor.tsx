import { useState } from "react";
import { Stack } from "@mui/material";
import { EditorState, Editor, RichUtils } from "draft-js";
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

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleChangeText = (value: EditorState) => {
    const currentSelection = value.getSelection();
    const stateWithContentAndSelection = EditorState.forceSelection(
      value,
      currentSelection
    );
    setEditorState(stateWithContentAndSelection);
  };

  const handleToggleInlineStyles = (inlineStyle: string) => {
    const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
    setEditorState(newState);
  };

  const handleToggleBlockTypes = (blockType: string) => {
    const newState = RichUtils.toggleBlockType(editorState, blockType);
    setEditorState(newState);
  };

  return (
    <Stack borderRadius={1} sx={{ border: "1px solid rgba(0,0,0,0.2)" }}>
      <ControllersContainer>
        <InlineStyleControls
          onToggle={handleToggleInlineStyles}
          editorState={editorState}
        />
        <BlockStyleControls
          onToggle={handleToggleBlockTypes}
          editorState={editorState}
        />
      </ControllersContainer>
      <Editor editorState={editorState} onChange={handleChangeText} />
    </Stack>
  );
};

export default TextEditor;
