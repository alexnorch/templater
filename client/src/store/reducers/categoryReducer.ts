import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  categories: any[];
}

const initialState: CategoryState = {
  categories: JSON.parse(localStorage.getItem("categories")!) || [],
};

export const categorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    initCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { initCategories } = categorySlice.actions;

export default categorySlice.reducer;
