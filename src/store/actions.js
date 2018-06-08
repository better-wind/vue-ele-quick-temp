import types from './types'

export default {
  setLoading({commit},rs){
    commit(types.SET_LOADING,rs)
  },
  setToast({commit},rs){
    commit(types.SET_TOAST,rs)
  },
  setSearchConfig({commit},rs){
    commit(types.SET_SEARCH_CONFIG,rs)
  },
  setSearchParams({commit},rs){
    commit(types.SET_SEARCH_PARAMS,UtilTool.deepCopy(rs))
  },
  setViewImage ({commit},rs) {
    commit(types.SET_VIEW_IMAGE,rs)
  }
}
