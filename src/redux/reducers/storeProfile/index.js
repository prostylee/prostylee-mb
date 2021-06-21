import {createAction, handleActions} from 'redux-actions';
import {
  types as typeStoreVouchers,
  actions as actionsStoreVouchers,
  defaultState as defaultStateStoreVouchers,
  handleActions as handleActionsStoreVouchers,
} from './voucher';

export const types = {
  //STORE VOUCHER
  ...typeStoreVouchers,

  SET_STORE_PROFILE_LOADING: 'SET_STORE_PROFILE_LOADING',

  GET_STORE_INFO: 'GET_STORE_INFO',
  GET_STORE_INFO_SUCCESS: 'GET_STORE_INFO_SUCCESS',
  GET_STORE_INFO_FAILED: 'GET_STORE_INFO_FAILED',
  //BEST SELLER PRODUCT
  SET_STORE_BESTSELLER_PRODUCT_LOADING: 'SET_STORE_BESTSELLER_PRODUCT_LOADING',
  GET_STORE_BESTSELLER_PRODUCT: 'GET_STORE_BESTSELLER_PRODUCT',
  GET_STORE_BESTSELLER_PRODUCT_SUCCESS: 'GET_STORE_BESTSELLER_PRODUCT_SUCCESS',
  GET_STORE_BESTSELLER_PRODUCT_FAILED: 'GET_STORE_BESTSELLER_PRODUCT_FAILED',
  //STORE ALL PRODUCT
  SET_ALL_STORE_PRODUCT_LOADING: 'SET_ALL_STORE_PRODUCT_LOADING',
  SET_ALL_STORE_PRODUCT_LOADMORE_LOADING:
    'SET_ALL_STORE_PRODUCT_LOADMORE_LOADING',
  GET_ALL_STORE_PRODUCT: 'GET_ALL_STORE_PRODUCT',
  GET_ALL_STORE_PRODUCT_SUCCESS: 'GET_ALL_STORE_PRODUCT_SUCCESS',
  GET_ALL_STORE_PRODUCT_FAILED: 'GET_ALL_STORE_PRODUCT_FAILED',
  GET_ALL_STORE_PRODUCT_LOADMORE: 'GET_ALL_STORE_PRODUCT_LOADMORE',
  GET_ALL_STORE_PRODUCT_LOADMORE_SUCCESS:
    'GET_ALL_STORE_PRODUCT_LOADMORE_SUCCESS',
  GET_ALL_STORE_PRODUCT_LOADMORE_FAILED:
    'GET_ALL_STORE_PRODUCT_LOADMORE_FAILED',
  //FILTER STATE
  SET_STORE_PROFILE_FILTER_STATE: 'SET_STORE_PROFILE_FILTER_STATE',
  CLEAR_STORE_PROFILE_FILTER_STATE: 'CLEAR_STORE_PROFILE_FILTER_STATE',
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export const actions = {
  setStoreProfileLoading: createAction(types.SET_STORE_PROFILE_LOADING),
  getStoreInfo: createAction(types.GET_STORE_INFO),
  getStoreInfoSuccess: createAction(types.GET_STORE_INFO_SUCCESS),
  getStoreInfoFailed: createAction(types.GET_STORE_INFO_FAILED),

  setStoreBestSellerProductLoading: createAction(
    types.SET_STORE_BESTSELLER_PRODUCT_LOADING,
  ),
  getStoreBestSellerProduct: createAction(types.GET_STORE_BESTSELLER_PRODUCT),
  getStoreBestSellerProductSuccess: createAction(
    types.GET_STORE_BESTSELLER_PRODUCT_SUCCESS,
  ),
  getStoreBestSellerProductFailed: createAction(
    types.GET_STORE_BESTSELLER_PRODUCT_FAILED,
  ),

  setAllStoreProductLoading: createAction(types.SET_ALL_STORE_PRODUCT_LOADING),
  setAllStoreProductLoadmoreLoading: createAction(
    types.SET_ALL_STORE_PRODUCT_LOADMORE_LOADING,
  ),
  getAllStoreProduct: createAction(types.GET_ALL_STORE_PRODUCT),
  getAllStoreProductSuccess: createAction(types.GET_ALL_STORE_PRODUCT_SUCCESS),
  getAllStoreProductFailed: createAction(types.GET_ALL_STORE_PRODUCT_FAILED),

  getAllStoreProductLoadmore: createAction(
    types.GET_ALL_STORE_PRODUCT_LOADMORE,
  ),
  getAllStoreProductLoadmoreSuccess: createAction(
    types.GET_ALL_STORE_PRODUCT_LOADMORE_SUCCESS,
  ),
  getAllStoreProductLoadmoreFailed: createAction(
    types.GET_ALL_STORE_PRODUCT_LOADMORE_FAILED,
  ),

  setStoreProfileFilterState: createAction(
    types.SET_STORE_PROFILE_FILTER_STATE,
  ),
  clearStoreProfileFilterState: createAction(
    types.CLEAR_STORE_PROFILE_FILTER_STATE,
  ),
  //STORE VOUCHER
  ...actionsStoreVouchers,
};

const defaultState = {
  storeProfileLoading: false,
  storeInfo: null,
  bestSellerProductLoading: false,
  bestSellerProduct: null,
  allProductLoading: false,
  allProductLoadmoreLoading: false,
  allProduct: null,
  allProductCurrentPage: 0,
  hasAllProductLoadmore: false,
  storeProfileFilterState: {},
  //STORE VOUCHER
  ...defaultStateStoreVouchers,
};

export default handleActions(
  {
    [types.SET_STORE_PROFILE_LOADING]: (state, {payload}) => {
      return {...state, storeProfileLoading: payload};
    },
    [types.GET_STORE_INFO_SUCCESS]: (state, {payload}) => {
      return {...state, storeInfo: payload};
    },
    [types.GET_STORE_INFO_FAILED]: (state, {payload}) => {
      return {...state, storeInfo: {}};
    },

    [types.SET_STORE_BESTSELLER_PRODUCT_LOADING]: (state, {payload}) => {
      return {...state, bestSellerProductLoading: payload};
    },
    [types.GET_STORE_BESTSELLER_PRODUCT_SUCCESS]: (state, {payload}) => {
      return {...state, bestSellerProduct: payload};
    },
    [types.GET_STORE_BESTSELLER_PRODUCT_FAILED]: (state, {payload}) => {
      return {...state, bestSellerProduct: {}};
    },

    [types.SET_ALL_STORE_PRODUCT_LOADING]: (state, {payload}) => {
      return {...state, allProductLoading: payload};
    },
    [types.SET_ALL_STORE_PRODUCT_LOADMORE_LOADING]: (state, {payload}) => {
      return {...state, allProductLoadmoreLoading: payload};
    },
    [types.GET_ALL_STORE_PRODUCT_SUCCESS]: (state, {payload}) => {
      const {totalPages, content} = payload;
      console.log(
        'TOTAL PAGE',
        totalPages,
        'CURRENT PAGE',
        state.allProductCurrentPage,
      );
      return {
        ...state,
        allProduct: payload,
        allProductCurrentPage: PAGE_INIT,
        hasAllProductLoadmore:
          state.allProductCurrentPage + UNIT_INCREASE + 1 < totalPages
            ? true
            : false,
      };
    },
    [types.GET_ALL_STORE_PRODUCT_FAILED]: (state, {payload}) => {
      return {...state, allProduct: {}};
    },
    [types.GET_ALL_STORE_PRODUCT_LOADMORE_SUCCESS]: (state, {payload}) => {
      const {totalPages, content} = payload;
      console.log('LOAD MORE \n\n\n\n ');
      console.log(
        'TOTAL PAGE',
        totalPages,
        'CURRENT PAGE',
        state.allProductCurrentPage,
        state.allProductCurrentPage + UNIT_INCREASE + 1 < totalPages,
      );
      payload.content = state.allProduct?.content.concat(content) || [];
      return {
        ...state,
        allProduct: payload,
        allProductCurrentPage: state.allProductCurrentPage + UNIT_INCREASE,
        hasAllProductLoadmore:
          state.allProductCurrentPage + UNIT_INCREASE + 1 < totalPages
            ? true
            : false,
      };
    },
    [types.GET_ALL_STORE_PRODUCT_LOADMORE_FAILED]: (state, {payload}) => {
      return {...state, bestSellerProduct: {}};
    },

    //FILTER STATE
    [types.SET_STORE_PROFILE_FILTER_STATE]: (state, {payload}) => {
      return {
        ...state,
        storeProfileFilterState: {...payload},
      };
    },
    [types.CLEAR_STORE_PROFILE_FILTER_STATE]: (state, {payload}) => {
      return {
        ...state,
        storeProfileFilterState: {
          attributes: {},
          category: -1,
          price: [0, 0],
        },
      };
    },
    //STORE VOUCHER
    ...handleActionsStoreVouchers,
  },
  defaultState,
);
