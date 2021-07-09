import {createAction} from 'redux-actions';

export const types = {
  SET_STORE_LOADING: 'SET_STORE_LOADING',

  GET_TOP_BANNER: 'GET_TOP_BANNER',
  GET_TOP_BANNER_SUCCESS: 'GET_TOP_BANNER_SUCCESS',
  GET_TOP_BANNER_FAILED: 'GET_TOP_BANNER_FAILED',

  GET_MID_BANNER: 'GET_MID_BANNER',
  GET_MID_BANNER_SUCCESS: 'GET_MID_BANNER_SUCCESS',
  GET_MID_BANNER_FAILED: 'GET_MID_BANNER_FAILED',

  SET_DEFAULT_PAGE_BRAND: 'SET_DEFAULT_PAGE_BRAND',
  SET_BRAND_LIST_LOADING: 'SET_BRAND_LIST_LOADING',
  SET_BRAND_LIST_LOADMORE_LOADING: 'SET_BRAND_LIST_LOADMORE_LOADING',
  GET_BRAND_LIST: 'GET_BRAND_LIST',
  GET_BRAND_LIST_SUCCESS: 'GET_BRAND_LIST_SUCCESS',
  GET_BRAND_LIST_FAILED: 'GET_BRAND_LIST_FAILED',
  GET_BRAND_LIST_LOADMORE: 'GET_BRAND_LIST_LOADMORE',
  GET_BRAND_LIST_LOADMORE_SUCCESS: 'GET_BRAND_LIST_LOADMORE_SUCCESS',
  GET_BRAND_LIST_LOADMORE_FAILED: 'GET_BRAND_LIST_LOADMORE_FAILED',

  GET_CATEGORY_LIST: 'GET_CATEGORY_LIST',
  GET_CATEGORY_LIST_SUCCESS: 'GET_CATEGORY_LIST_SUCCESS',
  GET_CATEGORY_LIST_FAILED: 'GET_CATEGORY_LIST_FAILED',

  GET_BOTTOM_TAB_LIST: 'GET_BOTTOM_TAB_LIST',
  GET_BOTTOM_TAB_LIST_SUCCESS: 'GET_BOTTOM_TAB_LIST_SUCCESS',
  GET_BOTTOM_TAB_LIST_FAILED: 'GET_BOTTOM_TAB_LIST_FAILED',
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
  setBrandListLoading: createAction(types.SET_BRAND_LIST_LOADING),
  setBrandListLoadmoreLoading: createAction(
    types.SET_BRAND_LIST_LOADMORE_LOADING,
  ),
  getBrandListLoadmore: createAction(types.GET_BRAND_LIST_LOADMORE),
  getBrandListLoadmoreSuccess: createAction(
    types.GET_BRAND_LIST_LOADMORE_SUCCESS,
  ),
  getBrandListLoadmoreFailed: createAction(
    types.GET_BRAND_LIST_LOADMORE_FAILED,
  ),
  setDefaultPageBrand: createAction(types.SET_DEFAULT_PAGE_BRAND),

  getCategoryList: createAction(types.GET_CATEGORY_LIST),
  getCategoryListSuccess: createAction(types.GET_CATEGORY_LIST_SUCCESS),
  getCategoryListFailed: createAction(types.GET_CATEGORY_LIST_FAILED),

  getBottomTabList: createAction(types.GET_BOTTOM_TAB_LIST),
  getBottomTabListSuccess: createAction(types.GET_BOTTOM_TAB_LIST_SUCCESS),
  getBottomTabListFailed: createAction(types.GET_BOTTOM_TAB_LIST_FAILED),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const defaultState = {
  isStoreLoading: false,
  isBrandlistLoading: false,
  isBrandlistLoadmoreLoading: false,
  topBannerList: {},
  midBannerList: {},
  brandList: {},
  categoryList: {},
  bottomTabList: [],
  brandListCurrentPage: PAGE_INIT,
  hasBrandlistLoadmore: false,
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
  //BRAND LIST
  [types.SET_BRAND_LIST_LOADING]: (state, {payload}) => {
    return {
      ...state,
      isBrandlistLoading: payload,
    };
  },
  [types.SET_BRAND_LIST_LOADMORE_LOADING]: (state, {payload}) => {
    return {
      ...state,
      isBrandlistLoadmoreLoading: payload,
    };
  },

  [types.GET_BRAND_LIST_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      brandList: payload,
      brandListCurrentPage: UNIT_INCREASE,
      hasBrandlistLoadmore:
        state.brandListCurrentPage + UNIT_INCREASE <= totalPages ? true : false,
    };
  },
  [types.GET_BRAND_LIST_FAILED]: (state, {payload}) => {
    return {...state, brandList: {}};
  },

  [types.GET_BRAND_LIST_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.brandList?.content.concat(content) || [];
    return {
      ...state,
      brandList: payload,
      brandListCurrentPage: state.brandListCurrentPage + UNIT_INCREASE,
      hasBrandlistLoadmore:
        state.brandListCurrentPage + UNIT_INCREASE < totalPages ? true : false,
    };
  },
  [types.GET_BRAND_LIST_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state, brandList: {}};
  },
  [types.SET_DEFAULT_PAGE_BRAND]: (state, {payload}) => {
    return {...state, brandListCurrentPage: payload};
  },

  //CATEGORY
  [types.GET_CATEGORY_LIST_SUCCESS]: (state, {payload}) => {
    return {...state, categoryList: payload};
  },
  [types.GET_CATEGORY_LIST_FAILED]: (state, {payload}) => {
    return {...state, categoryList: {}};
  },
  [types.GET_BOTTOM_TAB_LIST_SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      bottomTabList: payload,
    };
  },
  [types.GET_BOTTOM_TAB_LIST_FAILED]: (state, {payload}) => {
    return {
      ...state,
      bottomTabList: [],
    };
  },
};
