
export function getDefaultRepositoryState() {
  return {
    isLoading: false,
    fetchError: true,
    totalCount: -1,
    ids: [],
    byId: {},
    pageSize: 100,
    last: undefined,
  }
}
