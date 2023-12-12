import { useState } from "react";

import { Stack } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

// Components
import TemplateGenderFilter from "./TemplateGenderFilter";
import TemplateSearch from "./TemplateSearch";
import TemplateLangFilter from "./TemplateLangFilter";

const TemplateFilter = () => {
  const [gender, setGender] = useState("");
  const [lang, setLang] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const onChangeGender = (
    event: React.MouseEvent<HTMLElement>,
    selectedGender: string
  ) => {
    setGender(selectedGender);
  };

  const onChangeLang = (event: SelectChangeEvent) => {
    setLang(event.target.value);
  };

  const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Stack
      spacing={5}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <TemplateSearch value={searchValue} onChange={onChangeSearchValue} />
      <TemplateGenderFilter onChange={onChangeGender} value={gender} />
      <TemplateLangFilter onChange={onChangeLang} value={lang} />
    </Stack>
  );
};

export default TemplateFilter;
