import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// Slices
import appSlice from "./reducers/appSlice";
import userSlice from "./reducers/userSlice";
import templatesSlice from "./reducers/templatesSlice";
import categoriesSlice from "./reducers/categoriesSlice";

// Sagas

const rootReducer = combineReducers({
  app: appSlice,
  user: userSlice,
  templates: templatesSlice,
  categories: categoriesSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
