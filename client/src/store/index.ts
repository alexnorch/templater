import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Reducers
import appSlice from "./reducers/appReducer";
import userSlice from "./reducers/userReducer";
import categorySlice from "./reducers/categoryReducer";
import templateSlice from "./reducers/templateReducer";

const rootReducer = combineReducers({
  app: appSlice,
  user: userSlice,
  category: categorySlice,
  template: templateSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
