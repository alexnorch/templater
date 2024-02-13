// Icons
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ListIcon from "@mui/icons-material/List";

export const TEXT_EDITOR_BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "OL", style: "ordered-list-item", icon: FormatListNumberedIcon },
  { label: "UL", style: "unordered-list-item", icon: ListIcon },
];

export const TEXT_EDITOR_INLINE_STYLES = [
  { label: "Bold", style: "BOLD", icon: FormatBoldIcon },

  {
    label: "Underline",
    style: "UNDERLINE",
    icon: FormatUnderlinedIcon,
  },
  {
    label: "Italic",
    style: "ITALIC",
    icon: FormatItalicIcon,
  },
];
