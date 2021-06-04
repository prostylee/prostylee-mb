import {createAction} from 'redux-actions';

export const types = {
  SET_STORE_LOADING: 'SET_STORE_LOADING',

  GET_TOP_BANNER: 'GET_TOP_BANNER',
  GET_TOP_BANNER_SUCCESS: 'GET_TOP_BANNER_SUCCESS',
  GET_TOP_BANNER_FAILED: 'GET_TOP_BANNER_FAILED',

  GET_MID_BANNER: 'GET_MID_BANNER',
  GET_MID_BANNER_SUCCESS: 'GET_MID_BANNER_SUCCESS',
  GET_MID_BANNER_FAILED: 'GET_MID_BANNER_FAILED',

  GET_BRAND_LIST: 'GET_BRAND_LIST',
  GET_BRAND_LIST_SUCCESS: 'GET_BRAND_LIST_SUCCESS',
  GET_BRAND_LIST_FAILED: 'GET_BRAND_LIST_FAILED',

  GET_CATEGORY_LIST: 'GET_CATEGORY_LIST',
  GET_CATEGORY_LIST_SUCCESS: 'GET_CATEGORY_LIST_SUCCESS',
  GET_CATEGORY_LIST_FAILED: 'GET_CATEGORY_LIST_FAILED',
};

export const actions = {
  setStoreLoading: createAction(types.SET_STORE_LOADING),

  getTopBanner: createAction(types.GET_TOP_BANNER),
  getTopBannerSuccess: createAction(types.GET_TOP_BANNER_SUCCESS),
  getTopBannerFailed: createAction(types.GET_TOP_BANNER_FAILED),

  getMidBanner: createAction(types.GET_MID_BANNER),
  getMidBannerSuccess: createAction(types.GET_MID_BANNER_SUCCESS),
  getMidBannerFailed: createAction(types.GET_MID_BANNER_FAILED),

  getBrandList: createAction(types.GET_BRAND_LIST),
  getBrandListSuccess: createAction(types.GET_BRAND_LIST_SUCCESS),
  getBrandListFailed: createAction(types.GET_BRAND_LIST_FAILED),

  getCategoryList: createAction(types.GET_CATEGORY_LIST),
  getCategoryListSuccess: createAction(types.GET_CATEGORY_LIST_SUCCESS),
  getCategoryListFailed: createAction(types.GET_CATEGORY_LIST_FAILED),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const defaultState = {
  isStoreLoading: false,
  topBannerList: {},
  midBannerList: {},
  brandList: {},
  categoryList: {},
};

export const handleActions = {
  [types.SET_STORE_LOADING]: (state, {payload}) => {
    return {...state, isStoreLoading: payload};
  },

  [types.GET_TOP_BANNER_SUCCESS]: (state, {payload}) => {
    return {...state, topBannerList: payload};
  },
  [types.GET_TOP_BANNER_FAILED]: (state, {payload}) => {
    return {...state, topBannerList: {}};
  },

  [types.GET_MID_BANNER_SUCCESS]: (state, {payload}) => {
    return {...state, midBannerList: payload};
  },
  [types.GET_MID_BANNER_FAILED]: (state, {payload}) => {
    return {...state, midBannerList: {}};
  },

  [types.GET_BRAND_LIST_SUCCESS]: (state, {payload}) => {
    return {...state, brandList: payload};
  },
  [types.GET_BRAND_LIST_FAILED]: (state, {payload}) => {
    return {...state, brandList: {}};
  },

  [types.GET_CATEGORY_LIST_SUCCESS]: (state, {payload}) => {
    return {...state, categoryList: payload};
  },
  [types.GET_CATEGORY_LIST_FAILED]: (state, {payload}) => {
    return {...state, categoryList: {}};
  },
};
