import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IAttribute } from "../../types";

interface FilterState {
  title: string | null;
  category: string | null;
  attributes: { [key: string]: string };
  attributeLabels: IAttribute[];
}

const initialState: FilterState = {
  title: null,
  category: null,
  attributes: {},
  attributeLabels: [],
};

export const filterSlice = createSlice({
  name: "Filter",
  initialState,
  reducers: {
    setAttributesValues: (
      state,
      action: PayloadAction<{ [key: string]: string }>
    ) => {
      state.attributes = {
        ...state.attributes,
        ...action.payload,
      };
    },
    setAttributeLabel: (state, action: PayloadAction<IAttribute[]>) => {
      state.attributeLabels = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
  },
});

export const { setAttributesValues, setTitle, setCategory, setAttributeLabel } =
  filterSlice.actions;

export const selectFilterCategory = (state: RootState) => state.filter.category;

// Subscribes only for title, category and attributeValue
export const selectFilterParams = createSelector(
  (state: RootState) => state.filter.title,
  (state: RootState) => state.filter.category,
  (state: RootState) => state.filter.attributes,
  (title, category, attributes) => ({
    title,
    category,
    attributes,
  })
);

export const selectAttributesValues = (state: RootState) =>
  state.filter.attributes;

export const selectAttributeLabels = (state: RootState) =>
  state.filter.attributeLabels;

export default filterSlice.reducer;
