import { call, put, takeEvery } from 'redux-saga/effects';

import API from '../../API';
import { APP_STORE_MAKE_REQUEST, appStoreUpdateStore } from './actions';

function* makeRequest(action) {
  const { storeName, dataSource, mapper, ...other } = action.payload;

  yield put(appStoreUpdateStore({ storeName, data: { dataSource, isLoading: true } }));
  const data = yield call(() => API.request(dataSource, other).then(res => res.data.children));

  yield put(appStoreUpdateStore({ storeName, data: { data, isLoading: false }, mapper }));
}

export function* watchMakeRequest() {
  yield takeEvery(APP_STORE_MAKE_REQUEST, makeRequest);
}
