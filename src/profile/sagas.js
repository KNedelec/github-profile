import { call, put, select, takeLatest } from 'redux-saga/effects';

import { selectAuthToken } from '../auth/selectors';
import { fetchProfile } from '../datasource';

export function* profileSaga() {
  yield takeLatest('PROFILE_REQUESTED', fetch);
}

function* fetch() {
  const token = yield select(selectAuthToken);
  const { profile, error } = yield call(fetchProfile, token);

  switch (error) {
    case 'INVALID_TOKEN':
      yield put({ type: 'AUTH_ERROR', error });
      break;

    case 'NETWORK_ERROR':
      yield put({ type: 'NETWORK_ERROR', error});
      break;

    case undefined:
      yield put({ type: 'PROFILE_RECEIVED', profile });
      break;

    case 'UNKNOWN_ERROR':
    default:
      yield put({ type: 'UNKNOWN_ERROR', error});
      break;
  }
}
