import {createAction} from 'redux-actions';

export const types = {
  SET_PERSONAL_SALERS_LOADING: 'SET_PERSONAL_SALERS_LOADING',
  SET_PERSONAL_SALERS_LOADMORE_LOADING: 'SET_PERSONAL_SALERS_LOADMORE_LOADING',

  GET_PERSONAL_SALERS: 'GET_PERSONAL_SALERS',
  GET_PERSONAL_SALERS_SUCCESS: 'GET_PERSONAL_SALERS_SUCCESS',
  GET_PERSONAL_SALERS_FAILED: 'GET_PERSONAL_SALERS_FAILED',

  GET_PERSONAL_SALERS_LOADMORE: 'GET_PERSONAL_SALERS_LOADMORE',
  GET_PERSONAL_SALERS_LOADMORE_SUCCESS: 'GET_PERSONAL_SALERS_LOADMORE_SUCCESS',
  GET_PERSONAL_SALERS_LOADMORE_FAILED: 'GET_PERSONAL_SALERS_LOADMORE_FAILED',

  SET_PERSONAL_SALERS_FILTER_STATE: 'SET_PERSONAL_SALERS_FILTER_STATE',
  CLEAR_PERSONAL_SALERS_FILTER_STATE: 'CLEAR_PERSONAL_SALERS_FILTER_STATE',
};

export const actions = {
  setPersonalSalersLoading: createAction(types.SET_PERSONAL_SALERS_LOADING),
  setPersonalSalersLoadmoreLoading: createAction(
    types.SET_PERSONAL_SALERS_LOADMORE_LOADING,
  ),
  getPersonalSalers: createAction(types.GET_PERSONAL_SALERS),
  getPersonalSalersSuccess: createAction(types.GET_PERSONAL_SALERS_SUCCESS),
  getPersonalSalersFailed: createAction(types.GET_PERSONAL_SALERS_FAILED),
  getPersonalSalersLoadmore: createAction(types.GET_PERSONAL_SALERS_LOADMORE),
  getPersonalSalersLoadmoreSuccess: createAction(
    types.GET_PERSONAL_SALERS_LOADMORE_SUCCESS,
  ),
  getPersonalSalersLoadmoreFailed: createAction(
    types.GET_PERSONAL_SALERS_LOADMORE_FAILED,
  ),

  setPersonalSalersFilterState: createAction(
    types.SET_PERSONAL_SALERS_FILTER_STATE,
  ),
  clearPersonalSalersFilterState: createAction(
    types.CLEAR_PERSONAL_SALERS_FILTER_STATE,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const defaultState = {
  isPersonalSalersLoading: false,
  isPersonalSalersLoadmoreLoading: false,
  personalSalersData: {},
  personalSalersPage: 0,
  hasPersonalSalersLoadmore: false,
  personalSalersFilterState: {},
};

export const handleActions = {
  [types.SET_PERSONAL_SALERS_LOADING]: (state, {payload}) => {
    return {...state, isPersonalSalersLoading: payload};
  },
  [types.SET_PERSONAL_SALERS_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, isPersonalSalersLoadmoreLoading: payload};
  },

  [types.GET_PERSONAL_SALERS_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      personalSalersData: payload,
      personalSalersPage: PAGE_INIT + UNIT_INCREASE,
      hasPersonalSalersLoadmore:
        state.personalSalersPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_PERSONAL_SALERS_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.GET_PERSONAL_SALERS_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.personalSalersData?.content.concat(content) || [];
    return {
      ...state,
      personalSalersData: payload,
      personalSalersPage: state.personalSalersPage + UNIT_INCREASE,
      hasPersonalSalersLoadmore:
        state.personalSalersPage + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_PERSONAL_SALERS_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },

  [types.SET_PERSONAL_SALERS_FILTER_STATE]: (state, {payload}) => {
    return {
      ...state,
      personalSalersFilterState: {...payload},
    };
  },
  [types.CLEAR_PERSONAL_SALERS_FILTER_STATE]: (state, {payload}) => {
    return {
      ...state,
      personalSalersFilterState: {
        attributes: {},
        category: -1,
        price: [0, 0],
      },
    };
  },
};
