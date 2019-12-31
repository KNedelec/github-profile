
export function authReducer(state, action) {
  switch(action.type) {
    case 'TOKEN_CHANGED':
      return {
        ...state,
        token: action.token,
      }
    default: return state;
  }
}
