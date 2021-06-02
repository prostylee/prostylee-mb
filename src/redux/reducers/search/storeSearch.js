import {createAction} from 'redux-actions';

export const types = {
  //List STORE_SEARCH
  SET_STORE_SEARCH_LOADING: 'SET_STORE_SEARCH_LOADING',
  GET_STORE_SEARCH: 'GET_STORE_SEARCH',
  GET_STORE_SEARCH_SUCCESS: 'GET_STORE_SEARCH_SUCCESS',
  GET_STORE_SEARCH_FAILED: 'GET_STORE_SEARCH_FAILED',
};

export const actions = {
  //List FEATURED_PRODUCT_SEARCH
  setStoreSearchLoading: createAction(types.SET_STORE_SEARCH_LOADING),
  getStoreSearch: createAction(types.GET_STORE_SEARCH),
  getStoreSearchSuccess: createAction(types.GET_STORE_SEARCH_SUCCESS),
  getStoreSearchFailed: createAction(types.GET_STORE_SEARCH_FAILED),
};

export const defaultState = {
  //List STORE_SEARCH
  storeSearchLoading: false,
  storeList: {},
  pageStoreSearch: 0,
  limitStoreSearch: 12,
  storeSearchStatus: false,
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const handleActions = {
  //List FEATURED_PRODUCT_SEARCH
  [types.SET_STORE_SEARCH_LOADING]: (state, {payload}) => {
    return {...state, storeSearchLoading: payload};
  },
  // [types.GET_STORE_SEARCH]: (state, {payload}) => {
  //   console.log('Long GET_STORE_SEARCH ', payload);
  //   return {
  //     ...state,
  //   };
  // },
  [types.GET_STORE_SEARCH_FAILED]: (state, {payload}) => {
    return {
      ...state,
      storeSearchStatus: false,
    };
  },
  [types.GET_STORE_SEARCH_SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      storeList: [...payload],
      storeSearchStatus: true,
    };
  },
};
