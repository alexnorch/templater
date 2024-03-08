import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITemplateItem } from "../../types";
import { RootState } from "..";

interface TemplateSlice {
  hoveredTemplate: ITemplateItem | null;
  isPinned: boolean;
}

const initialState: TemplateSlice = {
  hoveredTemplate: null,
  isPinned: false,
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setHoveredTemplate: (
      state,
      action: PayloadAction<ITemplateItem | null>
    ) => {
      state.hoveredTemplate = action.payload;
    },
    setIsPinned: (state, action: PayloadAction<boolean>) => {
      state.isPinned = action.payload;
    },
  },
});

export const { setHoveredTemplate, setIsPinned } = templateSlice.actions;

export const selectHoveredTemplate = (state: RootState) =>
  state.template.hoveredTemplate;

export const selectIsPinned = (state: RootState) => state.template.isPinned;

export default templateSlice.reducer;
