import { getDefaultProfileState } from './profile/state';
import { getDefaultAuthState } from './auth/state';
import { getDefaultRepositoryState } from './repository/state';

export const getDefaultAppState = () => ({
  auth: getDefaultAuthState(),
  profile: getDefaultProfileState(),
  repository: getDefaultRepositoryState(),
});
