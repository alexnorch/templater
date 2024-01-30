import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Slices
import appSlice from "./reducers/appSlice";
import userSlice from "./reducers/userSlice";
import filterSlice from "../components/filters/filterSlice";
import { baseApi } from "../components/api/apiSlice";

// Sagas

const rootReducer = combineReducers({
  app: appSlice,
  user: userSlice,
  filter: filterSlice,
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
