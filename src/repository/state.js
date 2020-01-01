
export function getDefaultRepositoryState() {
  return {
    isLoading: false,
    totalCount: -1,
    ids: [],
    byId: {},
    pageSize: 100,
    last: undefined,
  }
}
