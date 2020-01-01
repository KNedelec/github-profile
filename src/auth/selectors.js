
export const selectAuthState = state => state.auth;

export const selectAuthToken = state => selectAuthState(state).token;

export const selectAuthStatus = state => selectAuthState(state).authStatus;
