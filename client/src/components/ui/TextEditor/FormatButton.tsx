import { Stack } from "@mui/material";

interface IFormatButton {
  isActive: boolean;
  label: string;
  style: string;
  IconType?: any;
  onToggle: (style: string) => void;
}

const FormatButton: React.FC<IFormatButton> = ({
  isActive,
  style,
  IconType,
  onToggle,
  label,
}) => {
  return (
    <Stack
      onClick={() => onToggle(style)}
      sx={{
        cursor: "pointer",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        padding: 0.5,
        backgroundColor: isActive ? "#1976d2" : "transparent",
        color: isActive ? "#fff" : "#333",
      }}
    >
      {IconType ? <IconType /> : label}
    </Stack>
  );
};

export default FormatButton;
