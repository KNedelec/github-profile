import { createSelector } from 'reselect';

export const selectRepositoryState = state => state.repository;

export const selectRepositoryMap = state => selectRepositoryState(state).byId;

export const selectRepositoryIds = state => selectRepositoryState(state).ids;

export const selectRepositoryIsFullyLoaded = state =>
  selectRepositoryState(state).fullyLoaded;

export const selectRepositoryTotalCount = state =>
  selectRepositoryState(state).totalCount;

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
