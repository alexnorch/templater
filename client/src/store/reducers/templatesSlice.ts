import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TemplatesState {
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
    updateQueryString: (
      state,
      { payload }: PayloadAction<{ key: string; value: string }>
    ) => {
      state.queryObj = { ...state.queryObj, [payload.key]: payload.value };
    },
  },
});

export const { updateQueryString } = templateSlice.actions;

export default templateSlice.reducer;
