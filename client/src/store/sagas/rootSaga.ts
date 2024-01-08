import { all } from "redux-saga/effects";

import templatesSagas from "./templatesSagas";
import categoriesSagas from "./categoriesSagas";

export default function* rootSaga() {
  yield all([templatesSagas(), categoriesSagas()]);
}
