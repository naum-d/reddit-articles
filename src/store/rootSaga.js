import { all } from 'redux-saga/effects';
import { watchMakeRequest } from './appStore/sagas';

export function* rootSaga() {
  yield all([watchMakeRequest()]);
}
