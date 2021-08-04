import {createAction} from 'redux-actions';

export const types = {
  SET_HIGHLIGHT_STORE_LOADING: 'SET_HIGHLIGHT_STORE_LOADING',
  SET_HIGHLIGHT_STORE_LOADMORE_LOADING: 'SET_HIGHLIGHT_STORE_LOADMORE_LOADING',

  GET_HIGHLIGHT_STORE: 'GET_HIGHLIGHT_STORE',
  GET_HIGHLIGHT_STORE_SUCCESS: 'GET_HIGHLIGHT_STORE_SUCCESS',
  GET_HIGHLIGHT_STORE_FAILED: 'GET_HIGHLIGHT_STORE_FAILED',

  GET_HIGHLIGHT_STORE_LOADMORE: 'GET_HIGHLIGHT_STORE_LOADMORE',
  GET_HIGHLIGHT_STORE_LOADMORE_SUCCESS: 'GET_HIGHLIGHT_STORE_LOADMORE_SUCCESS',
  GET_HIGHLIGHT_STORE_LOADMORE_FAILED: 'GET_HIGHLIGHT_STORE_LOADMORE_FAILED',
};

export const actions = {
  setHighlightStoreLoading: createAction(types.SET_HIGHLIGHT_STORE_LOADING),
  setHighlightStoreLoadmoreLoading: createAction(
    types.SET_HIGHLIGHT_STORE_LOADMORE_LOADING,
  ),
  getHighlightStore: createAction(types.GET_HIGHLIGHT_STORE),
  getHighlightStoreSuccess: createAction(types.GET_HIGHLIGHT_STORE_SUCCESS),
  getHighlightStoreFailed: createAction(types.GET_HIGHLIGHT_STORE_FAILED),
  getHighlightStoreLoadmore: createAction(types.GET_HIGHLIGHT_STORE_LOADMORE),
  getHighlightStoreLoadmoreSuccess: createAction(
    types.GET_HIGHLIGHT_STORE_LOADMORE_SUCCESS,
  ),
  getHighlightStoreLoadmoreFailed: createAction(
    types.GET_HIGHLIGHT_STORE_LOADMORE_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const defaultState = {
  isHighlightStoreLoading: false,
  isHighlightStoreLoadmoreLoading: false,
  highlightStoreData: {},
  highlightStorePage: 0,

  hasHighlightStoreLoadmore: false,
};

export const handleActions = {
  [types.SET_HIGHLIGHT_STORE_LOADING]: (state, {payload}) => {
    return {...state, isHighlightStoreLoading: payload};
  },
  [types.SET_HIGHLIGHT_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, isHighlightStoreLoadmoreLoading: payload};
  },

  [types.GET_HIGHLIGHT_STORE_SUCCESS]: (state, {payload}) => {
    const {totalPages} = payload;

    return {
      ...state,
      highlightStoreData: payload,
      highlightStorePage: PAGE_INIT + UNIT_INCREASE,
      hasHighlightStoreLoadmore:
        PAGE_INIT + UNIT_INCREASE < totalPages ? true : false,
    };
  },
  [types.GET_HIGHLIGHT_STORE_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_HIGHLIGHT_STORE_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.highlightStoreData?.content.concat(content) || [];
    return {
      ...state,
      highlightStoreData: payload,
      highlightStorePage: state.highlightStorePage + UNIT_INCREASE,
      hasHighlightStoreLoadmore:
        state.highlightStorePage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_HIGHLIGHT_STORE_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
