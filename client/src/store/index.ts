import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Reducers
import appSlice from "./reducers/appReducer";

const rootReducer = combineReducers({
  app: appSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
