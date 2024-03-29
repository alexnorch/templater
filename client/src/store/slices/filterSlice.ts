import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface FilterState {
  title: string | null;
  category: string | null;
  attributes: { [key: string]: string };
}

const initialState: FilterState = {
  title: null,
  category: null,
  attributes: {},
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
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
  },
});

export const { setAttributesValues, setTitle, setCategory } =
  filterSlice.actions;

export const selectAttributesValues = (state: RootState) =>
  state.filter.attributes;

export const selectFilterCategory = (state: RootState) => state.filter.category;

export const selectFilterParams = (state: RootState) => state.filter;

export default filterSlice.reducer;
