import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITemplateItem } from "../../types";

interface TemplateState {
  templates: ITemplateItem[];
  genderOptions: string[];
  languageOptions: string[];
  selectedTemplateId: null | string;
  queryObj: {
    gender: string;
    language: string;
    title: string;
    category: string;
  };
}

const initialState: TemplateState = {
  templates: [],
  genderOptions: ["male", "female", "both"],
  languageOptions: ["PL", "EN", "DE", "PT", "ES", "IT"],
  selectedTemplateId: null,
  queryObj: {
    gender: "",
    language: "",
    title: "",
    category: "",
  },
};

export const templateSlice = createSlice({
  name: "Template",
  initialState,
  reducers: {
    setSelectedTemplateId: (state, action: PayloadAction<string>) => {
      state.selectedTemplateId = action.payload;
    },
    initTemplates: (state, action: PayloadAction<any[]>) => {
      state.templates = action.payload;
    },
    updateQueryString: (
      state,
      { payload }: PayloadAction<{ key: string; value: string }>
    ) => {
      state.queryObj = { ...state.queryObj, [payload.key]: payload.value };
    },
  },
});

export const { initTemplates, updateQueryString, setSelectedTemplateId } =
  templateSlice.actions;

export default templateSlice.reducer;
