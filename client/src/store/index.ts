import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// Slices
import appSlice from "./reducers/appSlice";
import userSlice from "./reducers/userSlice";
import templateSlice from "./reducers/templatesSlice";
import categoriesSlice from "./reducers/categoriesSlice";

// Api
import { categoryApi } from "./api/categoryApi";
import { templateApi } from "./api/templateApi";

// middlewares
const sagaMiddleware = createSagaMiddleware();

// Sagas
import rootSaga from "./sagas/rootSaga";

const rootReducer = combineReducers({
  app: appSlice,
  user: userSlice,
  templates: templateSlice,
  categories: categoriesSlice,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [templateApi.reducerPath]: templateApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      categoryApi.middleware,
      templateApi.middleware,
      sagaMiddleware,
    ]),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
