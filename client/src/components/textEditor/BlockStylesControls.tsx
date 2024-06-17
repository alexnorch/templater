import type { EditorState } from "draft-js";
import { TEXT_EDITOR_BLOCK_TYPES } from "./constants";
import FormatButton from "./FormatButton";

interface IBlockStyleControls {
  editorState: EditorState;
  onToggle: (value: string) => void;
}

export const BlockStyleControls: React.FC<IBlockStyleControls> = ({
  editorState,
  onToggle,
}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return TEXT_EDITOR_BLOCK_TYPES.map((type) => (
    <FormatButton
      label={type.label}
      key={type.label}
      isActive={type.style === blockType}
      onToggle={onToggle}
      style={type.style}
      IconType={type.icon}
    />
  ));
};
