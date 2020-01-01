import _ from 'lodash';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { MAX_REPOSITORY_NB } from '../repository/config'
import { selectAuthToken } from '../auth/selectors';
import { fetchProfile, fetchRepositoryList } from './datasource';

export function* profileSaga() {
  const profile = yield takeLatest('PROFILE_REQUESTED', fetch);
  console.log('profile fetched', profile);
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

    case 'UNKNOWN_ERROR':
      yield put({ type: 'UNKNOWN_ERROR', error});
      break;

    default:
      yield put({ type: 'PROFILE_RECEIVED', profile });
      const userId = profile.id;

      yield put({ type: 'REPOSITORYLIST_REQUESTED', profile });
      const repositoryNb =
        _.min([profile.repositories.totalCount, MAX_REPOSITORY_NB]);

      let fullRepositoryList = [];

      while (fullRepositoryList.length < repositoryNb) {
        const cursor = fullRepositoryList.length ?
          fullRepositoryList[fullRepositoryList.length - 1].cursor : undefined;

        const { repositories, error } = yield call(fetchRepositoryList, token,
          userId, 100, cursor);

        fullRepositoryList.push(...repositories);
      }

      yield put({
        type: 'REPOSITORYLIST_RECEIVED',
        repositories: fullRepositoryList
      });
      break;
  }
}
