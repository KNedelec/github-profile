
export function getDefaultRepositoryState() {
  return {
    fullyLoaded: false,
    totalCount: 0,
    ids: [],
    byId: {},
    pageSize: 100,
    last: undefined,
  }
}
