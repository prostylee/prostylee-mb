import {createAction} from 'redux-actions';

export const types = {
  //List TOP_SEARCH
  SET_TOP_SEARCH_LOADING: 'SET_TOP_SEARCH_LOADING',
  GET_TOP_SEARCH: 'GET_TOP_SEARCH',
  GET_TOP_SEARCH_SUCCESS: 'GET_TOP_SEARCH_SUCCESS',
  GET_TOP_SEARCH_FAILED: 'GET_TOP_SEARCH_FAILED',
};

export const actions = {
  //List TOP_SEARCH
  setTopSearchLoading: createAction(types.SET_TOP_SEARCH_LOADING),
  getTopSearch: createAction(types.GET_TOP_SEARCH),
  getTopSearchSuccess: createAction(types.GET_TOP_SEARCH_SUCCESS),
  getTopSearchFailed: createAction(types.GET_TOP_SEARCH_FAILED),
};

export const defaultState = {
  //List TOP_SEARCH
  topSearchLoading: false,
  loadTopSearchMoreLoading: false,
  topSearch: {},
};

export const handleActions = {
  //List TopSearch from categories
  [types.SET_TOP_SEARCH_LOADING]: (state, {payload}) => {
    return {...state, topSearchLoading: payload};
  },
  [types.GET_TOP_SEARCH_SUCCESS]: (state, {payload}) => {
    const {totalPages} = payload;
    return {
      ...state,
      hasLoadMoreTopSearch: state.pageTopSearch + 1 < totalPages ? true : false,
      topSearch: [
        ...payload.resProduct.data,
        ...payload.resCategory.data,
        ...payload.resStore.data,
      ],
    };
  },
  [types.GET_TOP_SEARCH_FAILED]: (state, {payload}) => {
    return {
      ...state,
      topSearch: {},
    };
  },
};
