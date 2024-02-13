import { useState } from "react";
import {
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

const TextEditor = () => {
  const [fontSize, setFontSize] = useState("FONT_SIZE_12");
  const [heading, setHeading] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onFontSizeChange = (event: SelectChangeEvent) => {
    const selectedSize = event.target.value;

    if (selectedSize) {
      setFontSize(selectedSize);
      setEditorState(RichUtils.toggleInlineStyle(editorState, selectedSize));
    }
  };

  const onHeadingChange = (event: SelectChangeEvent) => {
    const selectedHeading = event.target.value;

    if (selectedHeading) {
      setHeading(selectedHeading);
      setEditorState(RichUtils.toggleBlockType(editorState, selectedHeading));
    }
  };

  const FontSizeControls = () => {
    return (
      <FormControl size="small" variant="standard">
        <InputLabel>Font Size</InputLabel>
        <Select onChange={onFontSizeChange} value={fontSize} label="Font Size">
          {fontSizes.map(({ label, style }) => (
            <MenuItem key={style} value={style}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const HeadingControls = () => {
    return (
      <FormControl size="small" variant="standard">
        <InputLabel>Heading</InputLabel>
        <Select onChange={onHeadingChange} value={heading} label="Heading">
          {headingTypes.map(({ label, style }) => (
            <MenuItem key={style} value={style}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <Stack minHeight={400} sx={{ border: "1px solid rgba(0,0,0,0.2)" }}>
      <Stack
        px={1}
        py={2}
        sx={{ background: "#ddd", borderBottom: "1px solid rgba(0,0,0,.4)" }}
        flexDirection="row"
        gap={2}
      >
        <HeadingControls />
        <FontSizeControls />
      </Stack>

      <Editor
        customStyleMap={customStyleMap}
        editorState={editorState}
        onChange={setEditorState}
      />
    </Stack>
  );
};

const headingTypes = [
  { label: "Heading 1", style: "header-one" },
  { label: "Heading 2", style: "header-two" },
  { label: "Heading 3", style: "header-three" },
  { label: "Heading 4", style: "header-four" },
  { label: "Heading 5", style: "header-five" },
  { label: "Heading 6", style: "header-six" },
];

const fontSizes = [
  { label: "10px", style: "FONT_SIZE_10" },
  { label: "12px", style: "FONT_SIZE_12" },
  { label: "14px", style: "FONT_SIZE_14" },
  { label: "16px", style: "FONT_SIZE_16" },
  { label: "18px", style: "FONT_SIZE_18" },
  { label: "20px", style: "FONT_SIZE_20" },
];

const customStyleMap = {
  FONT_SIZE_10: {
    fontSize: "10px",
  },
  FONT_SIZE_12: {
    fontSize: "12px",
  },
  FONT_SIZE_14: {
    fontSize: "14px",
  },
  FONT_SIZE_16: {
    fontSize: "16px",
  },
  FONT_SIZE_18: {
    fontSize: "18px",
  },
  FONT_SIZE_20: {
    fontSize: "18px",
  },
};

const inlineStyles = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

export default TextEditor;
