import { useState } from "react";

import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Select,
  MenuItem,
} from "@mui/material";

const tempCategory = ["Bonuses", "Verification", "Tech issues", "Tickets"];
const genders = ["male", "female", "both"];
const languages = ["EN", "PL", "DE", "PT", "ES"];

const TemplateForm = () => {
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [text, setText] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event?.target.value);
  };

  const handleLangChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <Stack my={2} minWidth={800} spacing={3} component="form">
      {/* Title */}
      <TextField label="Template title" variant="filled" />
      {/* Category */}
      <FormControl variant="filled" fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select value={category} label="Category" onChange={handleChange}>
          {tempCategory.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack flexDirection="row" sx={{ gap: 2 }}>
        {/* Language */}
        <FormControl variant="filled" fullWidth>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select value={language} label="Language" onChange={handleLangChange}>
            {languages.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Gender */}
        <FormControl variant="filled" fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select value={gender} label="Gender" onChange={handleGenderChange}>
            {genders.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <TextField
        id="template-text"
        label="Template text"
        multiline
        minRows={8}
        maxRows={12}
      />
    </Stack>
  );
};

export default TemplateForm;
