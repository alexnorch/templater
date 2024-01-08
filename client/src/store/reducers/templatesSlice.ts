import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITemplateItem } from "../../types";

interface TemplateState {
  templates: ITemplateItem[];
  isLoading: boolean;
  isError: boolean;
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
  isLoading: false,
  isError: false,
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
  name: "Templates",
  initialState,
  reducers: {
    fetchTemplatesRequest: (state) => {
      state.isLoading = true;
    },
    fetchTemplatesSuccess: (state, action: PayloadAction<any[]>) => {
      state.isLoading = false;
      state.templates = action.payload;
    },
    fetchTemplatesFailure: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    updateQueryString: (
      state,
      { payload }: PayloadAction<{ key: string; value: string }>
    ) => {
      state.queryObj = { ...state.queryObj, [payload.key]: payload.value };
    },
  },
});

export const {
  fetchTemplatesRequest,
  fetchTemplatesSuccess,
  fetchTemplatesFailure,
  updateQueryString,
} = templateSlice.actions;

export default templateSlice.reducer;
