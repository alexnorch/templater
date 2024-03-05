import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITemplateItem } from "../../types";
import { RootState } from "..";

interface TemplateSlice {
  hoveredTemplate: ITemplateItem | null;
  pinnedTemplate: ITemplateItem | null;
}

const initialState: TemplateSlice = {
  hoveredTemplate: null,
  pinnedTemplate: null,
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setHoveredTemplate: (state, action: PayloadAction<ITemplateItem>) => {
      state.hoveredTemplate = action.payload;
    },
    setPinnedTemplate: (state, action: PayloadAction<ITemplateItem | null>) => {
      state.pinnedTemplate = action.payload;
    },
  },
});

export const { setHoveredTemplate, setPinnedTemplate } = templateSlice.actions;

export const selectHoveredTemplate = (state: RootState) =>
  state.template.hoveredTemplate;
export const selectPinnedTemplate = (state: RootState) =>
  state.template.pinnedTemplate;

export default templateSlice.reducer;
