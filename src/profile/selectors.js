
export const selectProfileState = state => state.profile;

export const selectProfileIsLoading = state =>
  selectProfileState(state).isLoading;

export const selectProfileId = state => selectProfileState(state).id;
