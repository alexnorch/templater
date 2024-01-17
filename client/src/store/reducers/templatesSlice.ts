import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TemplatesState {
  genderOptions: string[];
  languageOptions: string[];
  selectedTemplateId: string | null;
  queryObj: {
    gender: string;
    language: string;
    title: string;
    category: string;
  };
}

const initialState: TemplatesState = {
  selectedTemplateId: null,
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
    setTemplateId: (state, action: PayloadAction<string | null>) => {
      state.selectedTemplateId = action.payload;
    },
    updateQueryString: (
      state,
      { payload }: PayloadAction<{ key: string; value: string }>
    ) => {
      state.queryObj = { ...state.queryObj, [payload.key]: payload.value };
    },
  },
});

export const { updateQueryString, setTemplateId } = templateSlice.actions;

export default templateSlice.reducer;
