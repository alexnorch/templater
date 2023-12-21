import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITemplateItem } from "../../types";

interface TemplateState {
  templates: ITemplateItem[];
  genderOptions: string[];
  languageOptions: string[];
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

export const { initTemplates, updateQueryString } = templateSlice.actions;

export default templateSlice.reducer;
