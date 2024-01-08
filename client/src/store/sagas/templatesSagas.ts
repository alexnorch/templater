import { put, takeEvery, all, call } from "redux-saga/effects";
import {
  fetchTemplatesSuccess,
  fetchTemplatesFailure,
  fetchTemplatesRequest,
} from "../reducers/templatesSlice";

import authAxios from "../../authAxios";

export function* fetchTemplates(): Generator<any, any, any> {
  try {
    const { data } = yield call(authAxios.get, "/api/templates");
    yield put(fetchTemplatesSuccess(data));
  } catch (error) {
    yield put(fetchTemplatesFailure());
  }
}

export function* watchTemplatesRequest() {
  yield takeEvery(fetchTemplatesRequest.type, fetchTemplates);
}

export default function* templatesSagas() {
  yield all([watchTemplatesRequest()]);
}
