import {getDefaultProfileState} from './state';

export function profileReducer(state, action) {
  switch(action.type) {
    case 'TOKEN_CHANGED':
      return {
        ...getDefaultProfileState(),
      }
    case 'PROFILE_REQUESTED':
      return {
        ...state,
        isLoading: true,
      }
    case 'PROFILE_RECEIVED':
      const { id, avatarUrl, name, login, bio } = action.profile;
      return {
        ...state,
        id,
        avatarUrl,
        bio,
        login,
        name,
        isLoading: false,
      }
    default: return state;
  }
}
