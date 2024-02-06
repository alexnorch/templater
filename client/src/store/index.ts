import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Slices
import authSlice from "../components/auth/authSlice";
import userSlice from "./reducers/userSlice";
import filterSlice from "../components/filters/filterSlice";

// Api
import { baseApi } from "../api/apiSlice";

const rootReducer = combineReducers({
  user: userSlice,
  filter: filterSlice,
  auth: authSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
