import { getDefaultAppState } from './state';
import { authReducer } from './auth/reducer';
import { profileReducer } from './profile/reducer';
import { repositoryReducer } from './repository/reducer';

export function appReducer(state = getDefaultAppState(), action) {
  switch (action.type) {
    default:
      return {
        ...state,
        auth: authReducer(state.auth, action),
        profile: profileReducer(state.profile, action),
        repository: repositoryReducer(state.repository, action),
      };
  }
}
