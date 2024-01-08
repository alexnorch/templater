import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoryItem } from "../../types";

interface CategoriesState {
  data: ICategoryItem[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: CategoriesState = {
  data: [],
  isLoading: false,
  isError: false,
};

const categoriesSlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    fetchCategoriesRequest: (state) => {
      state.isLoading = true;
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<ICategoryItem[]>) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchCategoriesFailure: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
