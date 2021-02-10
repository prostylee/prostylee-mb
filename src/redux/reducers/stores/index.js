import {createAction, handleActions} from 'redux-actions';

export const types = {
  SET_LOADING: 'prostylee/STORE/SET_LOADING',
  GET_TOP_PRODUCT: 'prostylee/STORE/GET_TOP_PRODUCT',
  GET_TOP_PRODUCT_SUCCESS: 'prostylee/STORE/GET_TOP_PRODUCT_SUCCESS',
  GET_TOP_PRODUCT_FAILED: 'prostylee/STORE/GET_TOP_PRODUCT_FAILED',
};

export const actions = {
  setLoading: createAction(types.SET_LOADING),
  getTopProduct: createAction(types.GET_TOP_PRODUCT),
  getTopProductSuccess: createAction(types.GET_TOP_PRODUCT_SUCCESS),
  getTopProductFailed: createAction(types.GET_TOP_PRODUCT_FAILED),
};

const intialState = {
  isLoading: false,
  topProduct: {},
  page: 0,
  limit: 12,
};

export default handleActions(
  {
    [types.SET_LOADING]: (state, {status}) => {
      return {...state, isLoading: status};
    },
    [types.GET_TOP_PRODUCT_SUCCESS]: (state, {payload}) => {
      return {...state, topProduct: payload};
    },
    [types.GET_TOP_PRODUCT_FAILED]: (state, {payload}) => {
      return {...state, topProduct: {}};
    },
  },
  intialState,
);
