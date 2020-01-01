import _ from 'lodash';
import { getDefaultRepositoryState } from './state';

export function repositoryReducer(state = getDefaultRepositoryState(), action) {
  switch(action.type) {
    case 'PROFILE_RECEIVED':
      return {
        ...state,
        totalCount: action.profile.repositories.totalCount,
      }
    case 'REPOSITORYLIST_REQUESTED':
      return {
        ...state,
        isLoading: true,
      }
    case 'REPOSITORYLIST_RECEIVED':
      return {
        ...state,
        isLoading: false,
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
  const { ref, stargazers, languages, ...repository } = record.node;

  return {
    cursor: record.cursor,
    ...repository,
    languages: languages.edges.map(e => ({
      name: e.node.name,
      color: e.node.color
    })),
    totalStars: stargazers.totalCount,
    totalCommits: ref ? ref.target.history.totalCount : 0,
  }
}
