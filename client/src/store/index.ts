import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Slices
import appSlice from "./reducers/appSlice";
import userSlice from "./reducers/userSlice";
import templatesSlice from "./reducers/templatesSlice";
import categoriesSlice from "./reducers/categoriesSlice";
import { baseApi } from "../components/api/apiSlice";

// Sagas

const rootReducer = combineReducers({
  app: appSlice,
  user: userSlice,
  templates: templatesSlice,
  categories: categoriesSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
