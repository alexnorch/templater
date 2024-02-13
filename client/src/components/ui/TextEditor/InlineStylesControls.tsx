import type { EditorState } from "draft-js";
import type { FC } from "react";
import { TEXT_EDITOR_INLINE_STYLES } from "./constants";
import FormatButton from "./FormatButton";

interface IInlineStyleControls {
  editorState: EditorState;
  onToggle: (value: string) => void;
}

export const InlineStyleControls: FC<IInlineStyleControls> = ({
  editorState,
  onToggle,
}) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <>
      {TEXT_EDITOR_INLINE_STYLES.map((type) => (
        <FormatButton
          label={type.label}
          key={type.label}
          isActive={currentStyle.has(type.style)}
          onToggle={onToggle}
          style={type.style}
          IconType={type.icon}
        />
      ))}
    </>
  );
};
