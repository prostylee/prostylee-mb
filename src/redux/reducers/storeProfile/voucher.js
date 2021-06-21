import {createAction} from 'redux-actions';

export const types = {
  SET_STORE_VOUCHERS_LOADING: 'SET_STORE_VOUCHERS_LOADING',
  SET_STORE_VOUCHERS_LOADMORE_LOADING: 'SET_STORE_VOUCHERS_LOADMORE_LOADING',

  GET_STORE_VOUCHERS: 'GET_STORE_VOUCHERS',
  GET_STORE_VOUCHERS_SUCCESS: 'GET_STORE_VOUCHERS_SUCCESS',
  GET_STORE_VOUCHERS_FAILED: 'GET_STORE_VOUCHERS_FAILED',

  GET_STORE_VOUCHERS_LOADMORE: 'GET_STORE_VOUCHERS_LOADMORE',
  GET_STORE_VOUCHERS_LOADMORE_SUCCESS: 'GET_STORE_VOUCHERS_LOADMORE_SUCCESS',
  GET_STORE_VOUCHERS_LOADMORE_FAILED: 'GET_STORE_VOUCHERS_LOADMORE_FAILED',

  SET_SAVE_STORE_VOUCHER_STATUS: 'SET_SAVE_STORE_VOUCHER_STATUS',
  POST_SAVE_STORE_VOUCHER: 'POST_SAVE_STORE_VOUCHER',
  POST_SAVE_STORE_VOUCHER_SUCCESS: 'POST_SAVE_STORE_VOUCHER_SUCCESS',
  POST_SAVE_STORE_VOUCHER_FAILED: 'POST_SAVE_STORE_VOUCHER_FAILED',
};

export const actions = {
  setStoreVouchersLoading: createAction(types.SET_STORE_VOUCHERS_LOADING),
  setStoreVouchersLoadmoreLoading: createAction(
    types.SET_STORE_VOUCHERS_LOADMORE_LOADING,
  ),

  getStoreVouchers: createAction(types.GET_STORE_VOUCHERS),
  getStoreVouchersSuccess: createAction(types.GET_STORE_VOUCHERS_SUCCESS),
  getStoreVouchersFailed: createAction(types.GET_STORE_VOUCHERS_FAILED),

  getStoreVouchersLoadmore: createAction(types.GET_STORE_VOUCHERS_LOADMORE),
  getStoreVouchersLoadmoreSuccess: createAction(
    types.GET_STORE_VOUCHERS_LOADMORE_SUCCESS,
  ),
  getStoreVouchersLoadmoreFailed: createAction(
    types.GET_STORE_VOUCHERS_LOADMORE_FAILED,
  ),

  setSaveStoreVoucherStatus: createAction(types.SET_SAVE_STORE_VOUCHER_STATUS),
  postSaveStoreVoucher: createAction(types.POST_SAVE_STORE_VOUCHER),
  postSaveStoreVoucherSuccess: createAction(
    types.POST_SAVE_STORE_VOUCHER_SUCCESS,
  ),
  postSaveStoreVoucherFailed: createAction(
    types.POST_SAVE_STORE_VOUCHER_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const defaultState = {
  isStoreVouchersLoading: false,
  isStoreVouchersLoadmoreLoading: false,
  storestoreVouchersData: {},
  storestorestoreVouchersPage: 0,
  hasStoreVouchersLoadmore: false,
  saveStoreVoucherStatus: null,
};

export const handleActions = {
  [types.SET_STORE_VOUCHERS_LOADING]: (state, {payload}) => {
    return {...state, isStoreVouchersLoading: payload};
  },
  [types.SET_STORE_VOUCHERS_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, isStoreVouchersLoadmoreLoading: payload};
  },

  [types.GET_STORE_VOUCHERS_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      storeVouchersData: payload,
      storestoreVouchersPage: PAGE_INIT,
      hasStoreVouchersLoadmore:
        state.storestoreVouchersPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_STORE_VOUCHERS_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_STORE_VOUCHERS_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.storeVouchersData?.content.concat(content) || [];
    return {
      ...state,
      storeVouchersData: payload,
      storestoreVouchersPage: state.storestoreVouchersPage + UNIT_INCREASE,
      hasStoreVouchersLoadmore:
        state.storestoreVouchersPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_STORE_VOUCHERS_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.POST_SAVE_STORE_VOUCHER_SUCCESS]: (state, {payload}) => {
    let newState = {...state?.storeVouchersData};
    newState?.content?.map((v) => {
      if (v.id === payload) {
        v.savedUserVoucherId = 1;
      }
      return v;
    });
    return {
      ...state,
      storeVouchersData: newState,
      saveStoreVoucherStatus: 'success',
    };
  },
  [types.POST_SAVE_STORE_VOUCHER_FAILED]: (state) => {
    return {
      ...state,
      saveStoreVoucherStatus: 'failed',
    };
  },
  [types.SET_SAVE_STORE_VOUCHER_STATUS]: (state, {payload}) => {
    return {
      ...state,
      saveStoreVoucherStatus: payload,
    };
  },
};
