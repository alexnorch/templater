import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";

import {
  fetchCategoriesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
} from "../reducers/categoriesSlice";

import authAxios from "../../authAxios";

export function* fetchCategories(): Generator<any, any, any> {
  try {
    const { data } = yield call(authAxios.get, "/api/categories");
    yield put(fetchCategoriesSuccess(data));
  } catch (error) {
    yield put(fetchCategoriesFailure());
  }
}

export function* createCategory(action: any): Generator<any, any, any> {
  try {
    const { data } = yield call(
      authAxios.post,
      "/api/categories",
      action.payload
    );
  } catch (error) {}
}

export function* watchCategoriesRequest() {
  yield takeEvery(fetchCategoriesRequest.type, fetchCategories);
}

export default function* categoriesSagas() {
  yield all([watchCategoriesRequest()]);
}
