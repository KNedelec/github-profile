
export function getDefaultRepositoryState() {
  return {
    isLoading: false,
    fetchError: false,
    totalCount: -1,
    ids: [],
    byId: {},
    pageSize: 100,
    last: undefined,
  }
}
