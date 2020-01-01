import { all, call, fork, take, put } from 'redux-saga/effects';

import { profileSaga } from './profile/sagas';
import { repositorySaga } from './repository/sagas';

export function* rootSaga() {
  yield all([
    fork(function* () {
      while(true) {
        const changeAction = yield take('TOKEN_CHANGED');
        yield put({ ...changeAction, type: 'PROFILE_REQUESTED' });
      }
    }),
    fork(profileSaga),
    fork(repositorySaga),
  ]);
}
