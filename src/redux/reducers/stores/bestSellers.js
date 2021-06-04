import {createAction} from 'redux-actions';

export const types = {
  SET_BEST_SELLERS_LOADING: 'SET_BEST_SELLERS_LOADING',
  SET_BEST_SELLERS_LOADMORE_LOADING: 'SET_BEST_SELLERS_LOADMORE_LOADING',

  GET_BEST_SELLERS: 'GET_BEST_SELLERS',
  GET_BEST_SELLERS_SUCCESS: 'GET_BEST_SELLERS_SUCCESS',
  GET_BEST_SELLERS_FAILED: 'GET_BEST_SELLERS_FAILED',

  GET_BEST_SELLERS_LOADMORE: 'GET_BEST_SELLERS_LOADMORE',
  GET_BEST_SELLERS_LOADMORE_SUCCESS: 'GET_BEST_SELLERS_LOADMORE_SUCCESS',
  GET_BEST_SELLERS_LOADMORE_FAILED: 'GET_BEST_SELLERS_LOADMORE_FAILED',
};

export const actions = {
  setBestSellersLoading: createAction(types.SET_BEST_SELLERS_LOADING),
  setBestSellersLoadmoreLoading: createAction(
    types.SET_BEST_SELLERS_LOADMORE_LOADING,
  ),
  getBestSellers: createAction(types.GET_BEST_SELLERS),
  getBestSellersSuccess: createAction(types.GET_BEST_SELLERS_SUCCESS),
  getBestSellersFailed: createAction(types.GET_BEST_SELLERS_FAILED),
  getBestSellersLoadmore: createAction(types.GET_BEST_SELLERS_LOADMORE),
  getBestSellersLoadmoreSuccess: createAction(
    types.GET_BEST_SELLERS_LOADMORE_SUCCESS,
  ),
  getBestSellersLoadmoreFailed: createAction(
    types.GET_BEST_SELLERS_LOADMORE_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const defaultState = {
  isBestSellersLoading: false,
  isBestSellersLoadmoreLoading: false,
  bestSellersData: {},
  bestSellersPage: 0,
  hasBestSellersLoadmore: false,
};

export const handleActions = {
  [types.SET_BEST_SELLERS_LOADING]: (state, {payload}) => {
    return {...state, isBestSellersLoading: payload};
  },
  [types.SET_BEST_SELLERS_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, isBestSellersLoadmoreLoading: payload};
  },

  [types.GET_BEST_SELLERS_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      bestSellersData: payload,
      bestSellersPage: PAGE_INIT,
      hasBestSellersLoadmore:
        state.bestSellersPage + UNIT_INCREASE + 1 < totalPages ? true : false,
    };
  },
  [types.GET_BEST_SELLERS_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_NEARBY_STORE_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.bestSellersData?.content.concat(content) || [];
    return {
      ...state,
      bestSellersData: payload,
      bestSellersPage: state.bestSellersPage + UNIT_INCREASE,
      hasBestSellersLoadmore:
        state.bestSellersPage + UNIT_INCREASE + 1 < totalPages ? true : false,
    };
  },
  [types.GET_NEARBY_STORE_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
