import {createAction} from 'redux-actions';

export const types = {
  //List STORE_SEARCH
  SET_STORE_SEARCH_LOADING: 'SET_STORE_SEARCH_LOADING',
  GET_STORE_SEARCH: 'GET_STORE_SEARCH',
  GET_STORE_SEARCH_SUCCESS: 'GET_STORE_SEARCH_SUCCESS',
  GET_STORE_SEARCH_FAILED: 'GET_STORE_SEARCH_FAILED',
  SET_STORE_SEARCH_LOADMORE_LOADING: 'SET_STORE_SEARCH_LOADMORE_LOADING',
  GET_STORE_SEARCH_LOADMORE: 'GET_STORE_SEARCH_LOADMORE',
  GET_STORE_SEARCH_LOADMORE_SUCCESS: 'GET_STORE_SEARCH_LOADMORE_SUCCESS',
  GET_STORE_SEARCH_LOADMORE_FAILED: 'GET_STORE_SEARCH_LOADMORE_FAILED',
};

export const actions = {
  //List FEATURED_PRODUCT_SEARCH
  setStoreSearchLoading: createAction(types.SET_STORE_SEARCH_LOADING),
  getStoreSearch: createAction(types.GET_STORE_SEARCH),
  getStoreSearchSuccess: createAction(types.GET_STORE_SEARCH_SUCCESS),
  getStoreSearchFailed: createAction(types.GET_STORE_SEARCH_FAILED),
  setStoreSearchLoadmoreLoading: createAction(
    types.SET_STORE_SEARCH_LOADMORE_LOADING,
  ),
  getStoreSearchLoadmore: createAction(types.GET_STORE_SEARCH_LOADMORE),
  getStoreSearchLoadmoreSuccess: createAction(
    types.GET_STORE_SEARCH_LOADMORE_SUCCESS,
  ),
  getStoreSearchLoadmoreFailed: createAction(
    types.GET_STORE_SEARCH_LOADMORE_FAILED,
  ),
};

export const defaultState = {
  //List STORE_SEARCH
  storeSearchLoading: false,
  storeList: {},
  pageStoreSearch: 0,
  limitStoreSearch: 12,
  storeSeachPage: 0,
  storeSearchLoadmoreLoading: false,
  hasStoreSearchLoadmore: false,
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const handleActions = {
  //List FEATURED_PRODUCT_SEARCH
  [types.SET_STORE_SEARCH_LOADING]: (state, {payload}) => {
    return {...state, storeSearchLoading: payload};
  },

  [types.GET_STORE_SEARCH_FAILED]: (state, {payload}) => {
    return {
      ...state,
    };
  },
  [types.GET_STORE_SEARCH_SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      storeList: {...payload},
    };
  },
  [types.SET_STORE_SEARCH_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, storeSearchLoadmoreLoading: payload};
  },
  [types.GET_STORE_SEARCH_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.productSearchList?.content.concat(content) || [];

    return {
      ...state,
      storeList: payload,
      storeSeachPage: state.pageProductSearch + UNIT_INCREASE,
      hasStoreSearchLoadmore:
        state.hasStoreSearchLoadmore + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_STORE_SEARCH_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
