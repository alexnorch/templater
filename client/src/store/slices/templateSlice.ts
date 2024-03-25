import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITemplateItem } from "../../types";
import { RootState } from "..";

interface TemplateSlice {
  selectedTemplate: ITemplateItem | null;
}

const initialState: TemplateSlice = {
  selectedTemplate: null,
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setSelectedTemplate: (
      state,
      action: PayloadAction<ITemplateItem | null>
    ) => {
      state.selectedTemplate = action.payload;
    },
  },
});

export const { setSelectedTemplate } = templateSlice.actions;

export const selectCurrentTemplate = (state: RootState) =>
  state.template.selectedTemplate;

export default templateSlice.reducer;
