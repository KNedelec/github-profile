import { call, put, select, takeLatest } from 'redux-saga/effects';

import { selectAuthToken } from '../auth/selectors';
import { fetchProfile, fetchRepositoryList } from './datasource';

export function* profileSaga() {
  const profile = yield takeLatest('REFRESH_PROFILE', fetch);
  console.log('profile fetched', profile);
}

function* fetch() {
  const token = yield select(selectAuthToken);
  const { profile, error } = yield call(fetchProfile, token);
  if (profile) {
    yield put({ type: 'PROFILE_RECEIVED', profile });
    const userId = profile.id;
    const repositoryNb = profile.repositories.totalCount;
    let fullRepositoryList = [];
    while (fullRepositoryList.length < repositoryNb) {
      const cursor = fullRepositoryList.length ?
        fullRepositoryList[fullRepositoryList.length - 1].cursor : undefined;
      const { repositories, error } = yield call(fetchRepositoryList, token,
        userId, 5, cursor);
      fullRepositoryList.push(...repositories);
    }

    yield put({
      type: 'REPOSITORYLIST_RECEIVED',
      repositories: fullRepositoryList
    });
  }
}
