
export function authReducer(state, action) {
  switch(action.type) {
    case 'TOKEN_CHANGED':
      return {
        ...state,
        token: action.token,
      }
    case 'PROFILE_RECEIVED':
      return {
        ...state,
        authStatus: 'AUTHENTICATED',
      }
    case 'NETWORK_ERROR':
      return {
        ...state,
        authStatus: 'NO_CONNECTIVITY',
      }
    case 'AUTH_ERROR':
      return {
        ...state,
        authStatus: action.error,
      }
    default: return state;
  }
}
