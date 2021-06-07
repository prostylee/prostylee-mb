import {createAction} from 'redux-actions';

export const types = {
  SET_FLASH_SALE_LOADING: 'SET_FLASH_SALE_LOADING',
  SET_FLASH_SALE_LOADMORE_LOADING: 'SET_FLASH_SALE_LOADMORE_LOADING',

  GET_FLASH_SALE: 'GET_FLASH_SALE',
  GET_FLASH_SALE_SUCCESS: 'GET_FLASH_SALE_SUCCESS',
  GET_FLASH_SALE_FAILED: 'GET_FLASH_SALE_FAILED',

  GET_FLASH_SALE_LOADMORE: 'GET_FLASH_SALE_LOADMORE',
  GET_FLASH_SALE_LOADMORE_SUCCESS: 'GET_FLASH_SALE_LOADMORE_SUCCESS',
  GET_FLASH_SALE_LOADMORE_FAILED: 'GET_FLASH_SALE_LOADMORE_FAILED',
};

export const actions = {
  setFlashSaleLoading: createAction(types.SET_FLASH_SALE_LOADING),
  setFlashSaleLoadmoreLoading: createAction(
    types.SET_FLASH_SALE_LOADMORE_LOADING,
  ),
  getFlashSale: createAction(types.GET_FLASH_SALE),
  getFlashSaleSuccess: createAction(types.GET_FLASH_SALE_SUCCESS),
  getFlashSaleFailed: createAction(types.GET_FLASH_SALE_FAILED),
  getFlashSaleLoadmore: createAction(types.GET_FLASH_SALE_LOADMORE),
  getFlashSaleLoadmoreSuccess: createAction(
    types.GET_FLASH_SALE_LOADMORE_SUCCESS,
  ),
  getFlashSaleLoadmoreFailed: createAction(
    types.GET_FLASH_SALE_LOADMORE_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const defaultState = {
  isFlashSaleLoading: false,
  isFlashSaleLoadmoreLoading: false,
  flashSaleData: {},
  flashSalePage: 0,
  hasFlashSaleLoadmore: false,
};

export const handleActions = {
  [types.SET_FLASH_SALE_LOADING]: (state, {payload}) => {
    return {...state, isFlashSaleLoading: payload};
  },
  [types.SET_FLASH_SALE_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, isFlashSaleLoadmoreLoading: payload};
  },

  [types.GET_FLASH_SALE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      flashSaleData: payload,
      flashSalePage: PAGE_INIT,
      hasFlashSaleLoadmore:
        state.flashSalePage + UNIT_INCREASE + 1 < totalPages ? true : false,
    };
  },
  [types.GET_FLASH_SALE_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_NEARBY_STORE_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.flashSaleData?.content.concat(content) || [];
    return {
      ...state,
      flashSaleData: payload,
      flashSalePage: state.flashSalePage + UNIT_INCREASE,
      hasFlashSaleLoadmore:
        state.flashSalePage + UNIT_INCREASE + 1 < totalPages ? true : false,
    };
  },
  [types.GET_NEARBY_STORE_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
