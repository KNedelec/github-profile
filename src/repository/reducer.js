import _ from 'lodash';
import { getDefaultRepositoryState } from './state';

export function repositoryReducer(state = getDefaultRepositoryState(), action) {
  switch(action.type) {
    case 'REPOSITORYLIST_RECEIVED':
      return {
        ...state,
        ids: _.uniq([
          ...state.ids,
          ...action.repositories.map(r => r.node.id),
        ]),
        byId: action.repositories
          .map(normalizeRepository)
          .reduce((acc, cur) => {
            acc[cur.id] = { ...cur };

            return acc;
          }, { ...state.byId }),
        last: _.tail(action.repositories).cursor,
        fullyLoaded: true,
      }
    case 'TOKEN_CHANGED':
      return {
        ...getDefaultRepositoryState(),
      }
    default:
      return state;
  }
}

function normalizeRepository(record) {
  const { ref, stargazers, ...repository } = record.node;

  return {
    cursor: record.cursor,
    ...repository,
    totalStars: stargazers.totalCount,
    totalCommits: ref ? ref.target.history.totalCount : 0,
  }
}
