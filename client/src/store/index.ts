import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Slices
import authSlice from "./slices/authSlice";
import filterSlice from "./slices/filterSlice";
import templateSlice from "./slices/templateSlice";

// Api
import { baseApi } from "../api/apiSlice";
import { rtkQueryErrorLogger } from "./middlewares/rtkQueryErrorLogger";

const rootReducer = combineReducers({
  filter: filterSlice,
  auth: authSlice,
  template: templateSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([baseApi.middleware, rtkQueryErrorLogger]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
