import _ from 'lodash';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { selectAuthToken} from '../auth/selectors';
import { fetchRepositoryList } from '../datasource';
import { MAX_REPOSITORY_NB } from '../repository/config'

export function* repositorySaga() {
  yield takeLatest('PROFILE_RECEIVED', fetch);
}

function* fetch(action) {
  const { profile } = action;
  const userId = profile.id;
  const token = yield select(selectAuthToken);

  yield put({ type: 'REPOSITORYLIST_REQUESTED', profile });

  const repositoryNb =
    _.min([profile.repositories.totalCount, MAX_REPOSITORY_NB]);

  let fullRepositoryList = [];

  while (fullRepositoryList.length < repositoryNb) {
    const cursor = fullRepositoryList.length ?
      fullRepositoryList[fullRepositoryList.length - 1].cursor : undefined;

    const { repositories, error } = yield call(fetchRepositoryList, token,
      userId, 100, cursor);

    switch (error) {

      case undefined:
        fullRepositoryList.push(...repositories);
        break;

      case 'INVALID_TOKEN':
      case 'NETWORK_ERROR':
      case 'UNKNOWN_ERROR':
      default:
        yield put({ type: 'REPOSITORY_RECEIVED_ERROR', error });
        return;
    }
  }

  yield put({
    type: 'REPOSITORYLIST_RECEIVED',
    repositories: fullRepositoryList
  });
}
