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
    initializeCategories: (state, action: PayloadAction<ICategoryItem[]>) => {
      state.data = action.payload;
    },
  },
});

export const { initializeCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
