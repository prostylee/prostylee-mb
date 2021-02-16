import {createAction, handleActions} from 'redux-actions';

export const types = {
  SET_LOADING: 'prostylee/STORE/SET_LOADING',
  GET_TOP_PRODUCT: 'prostylee/STORE/GET_TOP_PRODUCT',
  GET_TOP_PRODUCT_SUCCESS: 'prostylee/STORE/GET_TOP_PRODUCT_SUCCESS',
  GET_TOP_PRODUCT_FAILED: 'prostylee/STORE/GET_TOP_PRODUCT_FAILED',
  SET_LOADING_FUTURED_STORE: 'prostylee/STORE/SET_LOADING_FUTURED_STORE',
  GET_LIST_OF_FUTURED_STORE: 'prostylee/STORE/GET_LIST_OF_FUTURED_STORE',
  GET_LIST_OF_FUTURED_STORE_SUCCESS: 'prostylee/STORE/GET_LIST_OF_FUTURED_STORE_SUCCESS',
  GET_LIST_OF_FUTURED_STORE_FAILED: 'prostylee/STORE/GET_LIST_OF_FUTURED_STORE_FAILED',
};

export const actions = {
  setLoading: createAction(types.SET_LOADING),
  getTopProduct: createAction(types.GET_TOP_PRODUCT),
  getTopProductSuccess: createAction(types.GET_TOP_PRODUCT_SUCCESS),
  getTopProductFailed: createAction(types.GET_TOP_PRODUCT_FAILED),
  setLoadingFuturedStores: createAction(types.SET_LOADING_FUTURED_STORE),
  getListOfFuturedStore: createAction(types.GET_LIST_OF_FUTURED_STORE),
  getListOfFuturedStoreSuccess: createAction(types.GET_LIST_OF_FUTURED_STORE_SUCCESS),
  getListOfFuturedStoreFailed: createAction(types.GET_LIST_OF_FUTURED_STORE_FAILED),
};

const intialState = {
  isLoading: false,
  isLoadingFuturedStores: false,
  topProduct: {},
  listOfFuturedStores: {},
  page: 0,
  limit: 12,
};

export default handleActions(
  {
    [types.SET_LOADING]: (state, {payload}) => {
      return {...state, isLoading: payload};
    },
    [types.GET_TOP_PRODUCT_SUCCESS]: (state, {payload}) => {
      return {...state, topProduct: payload};
    },
    [types.GET_TOP_PRODUCT_FAILED]: (state, {payload}) => {
      return {...state, topProduct: {}};
    },
    [types.SET_LOADING_FUTURED_STORE]: (state, {payload}) => {
      return {...state, isLoadingFuturedStores: payload}
    },
    [types.GET_LIST_OF_FUTURED_STORE_SUCCESS]: (state, {payload}) => {
      return {...state, listOfFuturedStores: payload}
    },
    [types.GET_LIST_OF_FUTURED_STORE_FAILED]: (state, {payload}) => {
      return {...state, listOfFuturedStores: {}}
    },
  },
  intialState,
);
