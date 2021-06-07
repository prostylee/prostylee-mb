import {createAction} from 'redux-actions';

export const types = {
  SET_NEARBY_STORE_LOADING: 'SET_NEARBY_STORE_LOADING',
  SET_NEARBY_STORE_LOADMORE_LOADING: 'SET_NEARBY_STORE_LOADMORE_LOADING',

  GET_NEARBY_STORE: 'GET_NEARBY_STORE',
  GET_NEARBY_STORE_SUCCESS: 'GET_NEARBY_STORE_SUCCESS',
  GET_NEARBY_STORE_FAILED: 'GET_NEARBY_STORE_FAILED',

  GET_NEARBY_STORE_LOADMORE: 'GET_NEARBY_STORE_LOADMORE',
  GET_NEARBY_STORE_LOADMORE_SUCCESS: 'GET_NEARBY_STORE_LOADMORE_SUCCESS',
  GET_NEARBY_STORE_LOADMORE_FAILED: 'GET_NEARBY_STORE_LOADMORE_FAILED',
};

export const actions = {
  setNearbyStoreLoading: createAction(types.SET_NEARBY_STORE_LOADING),
  setNearbyStoreLoadmoreLoading: createAction(
    types.SET_NEARBY_STORE_LOADMORE_LOADING,
  ),
  getNearbyStore: createAction(types.GET_NEARBY_STORE),
  getNearbyStoreSuccess: createAction(types.GET_NEARBY_STORE_SUCCESS),
  getNearbyStoreFailed: createAction(types.GET_NEARBY_STORE_FAILED),
  getNearbyStoreLoadmore: createAction(types.GET_NEARBY_STORE_LOADMORE),
  getNearbyStoreLoadmoreSuccess: createAction(
    types.GET_NEARBY_STORE_LOADMORE_SUCCESS,
  ),
  getNearbyStoreLoadmoreFailed: createAction(
    types.GET_NEARBY_STORE_LOADMORE_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const defaultState = {
  isNearbyStoreLoading: false,
  isNearbyStoreLoadmoreLoading: false,
  nearbyStoreData: {},
  nearbyStorePage: 0,

  hasNearbyStoreLoadmore: false,
};

export const handleActions = {
  [types.SET_NEARBY_STORE_LOADING]: (state, {payload}) => {
    return {...state, isNearbyStoreLoading: payload};
  },
  [types.SET_NEARBY_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, isNearbyStoreLoadmoreLoading: payload};
  },

  [types.GET_NEARBY_STORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      nearbyStoreData: payload,
      nearbyStorePage: PAGE_INIT,
      hasNearbyStoreLoadmore:
        state.nearbyStorePage + UNIT_INCREASE + 1 < totalPages ? true : false,
    };
  },
  [types.GET_NEARBY_STORE_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_NEARBY_STORE_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.nearbyStoreData?.content.concat(content) || [];
    return {
      ...state,
      nearbyStoreData: payload,
      nearbyStorePage: state.nearbyStorePage + UNIT_INCREASE,
      hasNearbyStoreLoadmore:
        state.nearbyStorePage + UNIT_INCREASE + 1 < totalPages ? true : false,
    };
  },
  [types.GET_NEARBY_STORE_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
