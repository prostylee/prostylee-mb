import {createAction} from 'redux-actions';

export const types = {
  SET_VOUCHERS_LOADING: 'SET_VOUCHERS_LOADING',
  SET_VOUCHERS_LOADMORE_LOADING: 'SET_VOUCHERS_LOADMORE_LOADING',

  GET_VOUCHERS: 'GET_VOUCHERS',
  GET_VOUCHERS_SUCCESS: 'GET_VOUCHERS_SUCCESS',
  GET_VOUCHERS_FAILED: 'GET_VOUCHERS_FAILED',

  GET_VOUCHERS_LOADMORE: 'GET_VOUCHERS_LOADMORE',
  GET_VOUCHERS_LOADMORE_SUCCESS: 'GET_VOUCHERS_LOADMORE_SUCCESS',
  GET_VOUCHERS_LOADMORE_FAILED: 'GET_VOUCHERS_LOADMORE_FAILED',

  SET_SAVE_VOUCHER_STATUS: 'SET_SAVE_VOUCHER_STATUS',
  POST_SAVE_VOUCHER: 'POST_SAVE_VOUCHER',
  POST_SAVE_VOUCHER_SUCCESS: 'POST_SAVE_VOUCHER_SUCCESS',
  POST_SAVE_VOUCHER_FAILED: 'POST_SAVE_VOUCHER_FAILED',
};

export const actions = {
  setVouchersLoading: createAction(types.SET_VOUCHERS_LOADING),
  setVouchersLoadmoreLoading: createAction(types.SET_VOUCHERS_LOADMORE_LOADING),

  getVouchers: createAction(types.GET_VOUCHERS),
  getVouchersSuccess: createAction(types.GET_VOUCHERS_SUCCESS),
  getVouchersFailed: createAction(types.GET_VOUCHERS_FAILED),

  getVouchersLoadmore: createAction(types.GET_VOUCHERS_LOADMORE),
  getVouchersLoadmoreSuccess: createAction(types.GET_VOUCHERS_LOADMORE_SUCCESS),
  getVouchersLoadmoreFailed: createAction(types.GET_VOUCHERS_LOADMORE_FAILED),

  setSaveVoucherStatus: createAction(types.SET_SAVE_VOUCHER_STATUS),
  postSaveVoucher: createAction(types.POST_SAVE_VOUCHER),
  postSaveVoucherSuccess: createAction(types.POST_SAVE_VOUCHER_SUCCESS),
  postSaveVoucherFailed: createAction(types.POST_SAVE_VOUCHER_FAILED),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const defaultState = {
  isVouchersLoading: false,
  isVouchersLoadmoreLoading: false,
  vouchersData: {},
  vouchersPage: 0,
  hasVouchersLoadmore: false,
  saveVoucherStatus: null,
};

export const handleActions = {
  [types.SET_VOUCHERS_LOADING]: (state, {payload}) => {
    return {...state, isVouchersLoading: payload};
  },
  [types.SET_VOUCHERS_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, isVouchersLoadmoreLoading: payload};
  },

  [types.GET_VOUCHERS_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      vouchersData: payload,
      vouchersPage: PAGE_INIT + UNIT_INCREASE,
      hasVouchersLoadmore:
        state.vouchersPage + UNIT_INCREASE + 1 < totalPages ? true : false,
    };
  },
  [types.GET_VOUCHERS_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_VOUCHERS_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.vouchersData?.content.concat(content) || [];
    return {
      ...state,
      vouchersData: payload,
      vouchersPage: state.vouchersPage + UNIT_INCREASE,
      hasVouchersLoadmore:
        state.vouchersPage + UNIT_INCREASE + 1 < totalPages ? true : false,
    };
  },
  [types.GET_VOUCHERS_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.POST_SAVE_VOUCHER_SUCCESS]: (state, {payload}) => {
    let newState = {...state?.vouchersData};
    newState?.content?.map((v) => {
      if (v.id === payload) {
        v.savedUserVoucherId = 1;
      }
      return v;
    });
    return {
      ...state,
      vouchersData: newState,
      saveVoucherStatus: 'success',
    };
  },
  [types.POST_SAVE_VOUCHER_FAILED]: (state) => {
    return {
      ...state,
      saveVoucherStatus: 'failed',
    };
  },
  [types.SET_SAVE_VOUCHER_STATUS]: (state, {payload}) => {
    return {
      ...state,
      saveVoucherStatus: payload,
    };
  },
};
