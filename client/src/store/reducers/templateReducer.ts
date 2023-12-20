import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TemplateState {
  categories: any[];
  genderOptions: string[];
  languageOptions: string[];
  queryObj: {
    gender: string;
    language: string;
    title: string;
  };
}

const initialState: TemplateState = {
  categories: [],
  genderOptions: ["male", "female", "both"],
  languageOptions: ["PL", "EN", "DE", "PT", "ES", "IT"],
  queryObj: {
    gender: "",
    language: "",
    title: "",
  },
};

export const templateSlice = createSlice({
  name: "Template",
  initialState,
  reducers: {
    initCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
    updateQueryString: (
      state,
      { payload }: PayloadAction<{ key: string; value: string }>
    ) => {
      state.queryObj = { ...state.queryObj, [payload.key]: payload.value };
    },
  },
});

export const { initCategories, updateQueryString } = templateSlice.actions;

export default templateSlice.reducer;
