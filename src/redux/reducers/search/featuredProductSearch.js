import {createAction} from 'redux-actions';

export const types = {
  //List FEATURED_PRODUCT_SEARCH
  SET_FEATURED_PRODUCT_SEARCH_LOADING: 'SET_FEATURED_PRODUCT_SEARCH_LOADING',
  GET_FEATURED_PRODUCT_SEARCH: 'GET_FEATURED_PRODUCT_SEARCH',
  GET_FEATURED_PRODUCT_SEARCH_SUCCESS: 'GET_FEATURED_PRODUCT_SEARCH_SUCCESS',
  GET_FEATURED_PRODUCT_SEARCH_FAILED: 'GET_FEATURED_PRODUCT_SEARCH_FAILED',
  SET_PAGE_FEATURED_PRODUCT_SEARCH_DEFAULT: 'SET_PAGE_FEATURED_PRODUCT_SEARCH_DEFAULT',
  SET_FEATURED_PRODUCT_SEARCH_LOADING_LOAD_MORE:
    'SET_FEATURED_PRODUCT_SEARCH_LOADING_LOAD_MORE',
  GET_FEATURED_PRODUCT_SEARCH_LOAD_MORE: 'GET_FEATURED_PRODUCT_SEARCH_LOAD_MORE',
  GET_FEATURED_PRODUCT_SEARCH_LOAD_MORE_SUCCESS:
    'GET_FEATURED_PRODUCT_SEARCH_LOAD_MORE_SUCCESS',
  GET_FEATURED_PRODUCT_SEARCH_LOAD_MORE_FAILED:
    'GET_FEATURED_PRODUCT_SEARCH_LOAD_MORE_FAILED',
};

export const actions = {
  //List FEATURED_PRODUCT_SEARCH
  setFeaturedProductSearchLoading: createAction(
    types.SET_FEATURED_PRODUCT_SEARCH_LOADING,
  ),
  getFeaturedProductSearch: createAction(types.GET_FEATURED_PRODUCT_SEARCH),
  getFeaturedProductSearchSuccess: createAction(
    types.GET_FEATURED_PRODUCT_SEARCH_SUCCESS,
  ),
  getFeaturedProductSearchFailed: createAction(
    types.GET_FEATURED_PRODUCT_SEARCH_FAILED,
  ),
  setPageFeaturedProductSearchDefault: createAction(
    types.SET_PAGE_FEATURED_PRODUCT_SEARCH_DEFAULT,
  ),
  setFeaturedProductSearchLoadingLoadMore: createAction(
    types.SET_FEATURED_PRODUCT_SEARCH_LOADING_LOAD_MORE,
  ),
  getFeaturedProductSearchLoadMore: createAction(
    types.GET_FEATURED_PRODUCT_SEARCH_LOAD_MORE,
  ),
  getFeaturedProductSearchLoadMoreSuccess: createAction(
    types.GET_FEATURED_PRODUCT_SEARCH_LOAD_MORE_SUCCESS,
  ),
  getFeaturedProductSearchLoadMoreFailed: createAction(
    types.GET_FEATURED_PRODUCT_SEARCH_LOAD_MORE_FAILED,
  ),
};

export const defaultState = {
  //List FEATURED_PRODUCT_SEARCH
  featuredProductSearchLoading: false,
  loadFeaturedProductSearchMoreLoading: false,
  featuredProductSearch: {},
  hasLoadMoreFeaturedProductSearch: false,
  pageFeaturedProductSearch: 0,
  limitFeaturedProductSearch: 12,
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const handleActions = {
  //List FEATURED_PRODUCT_SEARCH
  [types.SET_FEATURED_PRODUCT_SEARCH_LOADING]: (state, {payload}) => {
    return {...state, featuredProductSearchLoading: payload};
  },
  [types.GET_FEATURED_PRODUCT_SEARCH_SUCCESS]: (state, {payload}) => {
    const {totalPages} = payload;
    return {
      ...state,
      pageFeaturedProductSearchCategories: PAGE_INIT,
      hasLoadMoreFeaturedProductSearch:
        state.pageFeaturedProductSearch + 1 < totalPages ? true : false,
      featuredProductSearch: payload,
    };
  },
  [types.GET_FEATURED_PRODUCT_SEARCH_FAILED]: (state, {payload}) => {
    return {
      ...state,
      featuredProductSearch: {},
      hasLoadMoreFeaturedProductSearch: false,
    };
  },
  [types.SET_PAGE_FEATURED_PRODUCT_SEARCH_DEFAULT]: (state, {payload}) => {
    return {...state, pageFeaturedProductSearch: 0};
  },
  [types.SET_FEATURED_PRODUCT_SEARCH_LOADING_LOAD_MORE]: (state, {payload}) => {
    return {...state, loadFeaturedProductSearchMoreLoading: payload};
  },
  [types.GET_FEATURED_PRODUCT_SEARCH_LOAD_MORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.featuredProductSearch?.content.concat(content) || [];
    return {
      ...state,
      featuredProductSearch: payload,
      pageFeaturedProductSearch: state.pageFeaturedProductSearch + UNIT_INCREASE,
      hasLoadMoreFeaturedProductSearch:
        state.pageFeaturedProductSearch + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_FEATURED_PRODUCT_SEARCH_LOAD_MORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
