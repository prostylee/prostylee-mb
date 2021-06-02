import {createAction} from 'redux-actions';

export const types = {
  //List HINT_PRODUCT_SEARCH
  SET_HINT_PRODUCT_SEARCH_LOADING: 'SET_HINT_PRODUCT_SEARCH_LOADING',
  GET_HINT_PRODUCT_SEARCH: 'GET_HINT_PRODUCT_SEARCH',
  GET_HINT_PRODUCT_SEARCH_SUCCESS: 'GET_HINT_PRODUCT_SEARCH_SUCCESS',
  GET_HINT_PRODUCT_SEARCH_FAILED: 'GET_HINT_PRODUCT_SEARCH_FAILED',
  SET_PAGE_HINT_PRODUCT_SEARCH_DEFAULT: 'SET_PAGE_HINT_PRODUCT_SEARCH_DEFAULT',
  SET_HINT_PRODUCT_SEARCH_LOADING_LOAD_MORE:
    'SET_HINT_PRODUCT_SEARCH_LOADING_LOAD_MORE',
  GET_HINT_PRODUCT_SEARCH_LOAD_MORE: 'GET_HINT_PRODUCT_SEARCH_LOAD_MORE',
  GET_HINT_PRODUCT_SEARCH_LOAD_MORE_SUCCESS:
    'GET_HINT_PRODUCT_SEARCH_LOAD_MORE_SUCCESS',
  GET_HINT_PRODUCT_SEARCH_LOAD_MORE_FAILED:
    'GET_HINT_PRODUCT_SEARCH_LOAD_MORE_FAILED',
  SET_CURRENT_KEYWORD: 'SET_CURRENT_KEYWORD',
};

export const actions = {
  //List HINT_PRODUCT_SEARCH
  setHintProductSearchLoading: createAction(
    types.SET_HINT_PRODUCT_SEARCH_LOADING,
  ),
  getHintProductSearch: createAction(types.GET_HINT_PRODUCT_SEARCH),
  getHintProductSearchSuccess: createAction(
    types.GET_HINT_PRODUCT_SEARCH_SUCCESS,
  ),
  getHintProductSearchFailed: createAction(
    types.GET_HINT_PRODUCT_SEARCH_FAILED,
  ),
  setPageHintProductSearchDefault: createAction(
    types.SET_PAGE_HINT_PRODUCT_SEARCH_DEFAULT,
  ),
  setHintProductSearchLoadingLoadMore: createAction(
    types.SET_HINT_PRODUCT_SEARCH_LOADING_LOAD_MORE,
  ),
  getHintProductSearchLoadMore: createAction(
    types.GET_HINT_PRODUCT_SEARCH_LOAD_MORE,
  ),
  getHintProductSearchLoadMoreSuccess: createAction(
    types.GET_HINT_PRODUCT_SEARCH_LOAD_MORE_SUCCESS,
  ),
  getHintProductSearchLoadMoreFailed: createAction(
    types.GET_HINT_PRODUCT_SEARCH_LOAD_MORE_FAILED,
  ),
  setCurrentKeyword: createAction(types.SET_CURRENT_KEYWORD),
};

export const defaultState = {
  //List HINT_PRODUCT_SEARCH
  hintProductSearchLoading: false,
  loadHintProductSearchMoreLoading: false,
  hintProductSearch: {},
  hasLoadMoreHintProductSearch: false,
  pageHintProductSearch: 0,
  limitHintProductSearch: 12,
  currentKeyword: '',
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const handleActions = {
  //List HINT_PRODUCT_SEARCH
  [types.SET_HINT_PRODUCT_SEARCH_LOADING]: (state, {payload}) => {
    return {...state, hintProductSearchLoading: payload};
  },
  [types.GET_HINT_PRODUCT_SEARCH_SUCCESS]: (state, {payload}) => {
    const {totalPages} = payload;
    return {
      ...state,
      pageHintProductSearchCategories: PAGE_INIT,
      hasLoadMoreHintProductSearch:
        state.pageHintProductSearch + 1 < totalPages ? true : false,
      hintProductSearch: payload,
    };
  },
  [types.GET_HINT_PRODUCT_SEARCH_FAILED]: (state, {payload}) => {
    return {
      ...state,
      hintProductSearch: {},
      hasLoadMoreHintProductSearch: false,
    };
  },
  [types.SET_PAGE_HINT_PRODUCT_SEARCH_DEFAULT]: (state, {payload}) => {
    return {...state, pageHintProductSearch: 0};
  },
  [types.SET_HINT_PRODUCT_SEARCH_LOADING_LOAD_MORE]: (state, {payload}) => {
    return {...state, loadHintProductSearchMoreLoading: payload};
  },
  [types.GET_HINT_PRODUCT_SEARCH_LOAD_MORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.hintProductSearch?.content.concat(content) || [];
    return {
      ...state,
      hintProductSearch: payload,
      pageHintProductSearch: state.pageHintProductSearch + UNIT_INCREASE,
      hasLoadMoreHintProductSearch:
        state.pageHintProductSearch + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_HINT_PRODUCT_SEARCH_LOAD_MORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
  [types.SET_CURRENT_KEYWORD]: (state, {payload}) => {
    return {...state, currentKeyword: payload};
  },
};
