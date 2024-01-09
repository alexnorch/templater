import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITemplateItem } from "../../types";

interface TemplatesState {
  templates: ITemplateItem[];
  singleTemplate: any;
  isTemplateEditing: boolean;
  isTemplateDeleting: boolean;
  isLoadingTemplates: boolean;
  isErrorTemplates: boolean;
  isLoadingSingleTemplate: boolean;
  isErrorSingleTemplate: boolean;
  genderOptions: string[];
  languageOptions: string[];
  queryObj: {
    gender: string;
    language: string;
    title: string;
    category: string;
  };
}

const initialState: TemplatesState = {
  templates: [],
  singleTemplate: {},
  isTemplateDeleting: false,
  isTemplateEditing: false,
  isLoadingTemplates: false,
  isLoadingSingleTemplate: false,
  isErrorSingleTemplate: false,
  isErrorTemplates: false,
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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingTemplates = action.payload;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isErrorTemplates = action.payload;
    },
    setIsTemplateEditing: (state, action: PayloadAction<boolean>) => {
      state.isTemplateEditing = action.payload;
    },
    setIsTemplateDeleting: (state, action: PayloadAction<boolean>) => {
      state.isTemplateDeleting = action.payload;
    },
    initializeTemplates: (state, action: PayloadAction<ITemplateItem[]>) => {
      state.templates = action.payload;
    },
    initializeTemplate: (state, action: PayloadAction<ITemplateItem>) => {
      state.singleTemplate = action.payload;
    },
    addTemplate: (state, action: PayloadAction<ITemplateItem>) => {
      state.templates = [...state.templates, action.payload];
    },
    deleteTemplate: (state, action: PayloadAction<ITemplateItem>) => {
      state.templates = state.templates.filter(
        (template) => template._id !== action.payload._id
      );
    },
    updateTemplate: (
      state,
      { payload }: PayloadAction<{ id: string; template: ITemplateItem }>
    ) => {
      state.templates = state.templates.map((template) => {
        if (template._id === payload.template._id) {
          return payload.template;
        }

        return template;
      });
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
  setIsError,
  setIsLoading,
  addTemplate,
  deleteTemplate,
  updateTemplate,
  initializeTemplates,
  initializeTemplate,
  updateQueryString,
  setIsTemplateEditing,
  setIsTemplateDeleting,
} = templateSlice.actions;

export default templateSlice.reducer;
