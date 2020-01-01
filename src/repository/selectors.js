import { createSelector } from 'reselect';
import { MAX_REPOSITORY_NB} from './config';

export const selectRepositoryState = state => state.repository;

export const selectRepositoryMap = state => selectRepositoryState(state).byId;

export const selectRepositoryIds = state => selectRepositoryState(state).ids;

export const selectRepositoryTotalCount = state =>
  selectRepositoryState(state).totalCount;

export const selectRepositoryFetchError = state =>
  selectRepositoryState(state).fetchError;

export const selectRepositoryIsLoading = state =>
  selectRepositoryState(state).isLoading;

export const selectRepositoryIsFullyLoaded = createSelector(
  selectRepositoryIds,
  selectRepositoryTotalCount,
  (ids, count) => ids.length === count || ids.length === MAX_REPOSITORY_NB
);

export const selectRepositoryList = createSelector(
  selectRepositoryMap,
  selectRepositoryIds,
  (map, ids) => ids.map(id => map[id])
);

export const selectRepositoryTotalCommits = createSelector(
  selectRepositoryList,
  list => list.reduce((acc, cur) => acc += cur.totalCommits, 0)
);

export const selectRepositoryTotalStars = createSelector(
  selectRepositoryList,
  list => list.reduce((acc, cur) => acc += cur.totalStars, 0)
);

export const selectRepositoryTop3 = getSelectTopN(3);

function getSelectTopN(n) {
  return createSelector(
    state => n,
    selectRepositoryList,
    (n, list) => list.slice(0, n)
  );
}
