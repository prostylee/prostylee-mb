import {createAction, handleActions} from 'redux-actions';

export const types = {
  SET_LOADING: 'prostylee/STORE/SET_LOADING',
  GET_TOP_PRODUCT: 'prostylee/STORE/GET_TOP_PRODUCT',
  GET_TOP_PRODUCT_SUCCESS: 'prostylee/STORE/GET_TOP_PRODUCT_SUCCESS',
  GET_TOP_PRODUCT_FAILED: 'prostylee/STORE/GET_TOP_PRODUCT_FAILED',
  SET_LOADING_FUTURED_STORE: 'prostylee/STORE/SET_LOADING_FUTURED_STORE',
  GET_LIST_OF_FUTURED_STORE: 'prostylee/STORE/GET_LIST_OF_FUTURED_STORE',
  GET_LIST_OF_FUTURED_STORE_SUCCESS:
    'prostylee/STORE/GET_LIST_OF_FUTURED_STORE_SUCCESS',
  GET_LIST_OF_FUTURED_STORE_FAILED:
    'prostylee/STORE/GET_LIST_OF_FUTURED_STORE_FAILED',
  SET_LOADING_LOAD_MORE_FUTURED_STORE:
    'prostylee/STORE/SET_LOADING_LOAD_MORE_FUTURED_STORE',
  GET_LIST_OF_FUTURED_STORE_LOAD_MORE:
    'prostylee/STORE/GET_LIST_OF_FUTURED_STORE_LOAD_MORE',
  GET_LIST_OF_FUTURED_STORE_LOAD_MORE_SUCCESS:
    'prostylee/STORE/GET_LIST_OF_FUTURED_STORE_LOAD_MORE_SUCCESS',
  GET_LIST_OF_FUTURED_STORE_LOAD_MORE_FAILED:
    'prostylee/STORE/GET_LIST_OF_FUTURED_STORE_LOAD_MORE_FAILED',
  SET_PAGE_DEFAULT: 'prostylee/STORE/SET_PAGE_DEFAULT',
};

export const actions = {
  setLoading: createAction(types.SET_LOADING),
  setPageDefault: createAction(types.SET_PAGE_DEFAULT),
  getTopProduct: createAction(types.GET_TOP_PRODUCT),
  getTopProductSuccess: createAction(types.GET_TOP_PRODUCT_SUCCESS),
  getTopProductFailed: createAction(types.GET_TOP_PRODUCT_FAILED),
  setLoadingFuturedStores: createAction(types.SET_LOADING_FUTURED_STORE),
  getListOfFuturedStore: createAction(types.GET_LIST_OF_FUTURED_STORE),
  getListOfFuturedStoreSuccess: createAction(
    types.GET_LIST_OF_FUTURED_STORE_SUCCESS,
  ),
  getListOfFuturedStoreFailed: createAction(
    types.GET_LIST_OF_FUTURED_STORE_FAILED,
  ),
  setLoadingLoadMoreFuturedStores: createAction(
    types.SET_LOADING_LOAD_MORE_FUTURED_STORE,
  ),
  getListOfFuturedStoresLoadMore: createAction(
    types.GET_LIST_OF_FUTURED_STORE_LOAD_MORE,
  ),
  getListOfFuturedStoresLoadMoreSuccess: createAction(
    types.GET_LIST_OF_FUTURED_STORE_LOAD_MORE_SUCCESS,
  ),
  getListOfFuturedStoresLoadMoreFailed: createAction(
    types.GET_LIST_OF_FUTURED_STORE_LOAD_MORE_FAILED,
  ),
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

const intialState = {
  isLoading: false,
  isLoadingFuturedStores: false,
  isLoadMoreLoading: false,
  topProduct: {},
  listOfFuturedStores: {},
  hasLoadMore: false,
  page: 0,
  limit: 12,
};

export default handleActions(
  {
    [types.SET_LOADING]: (state, {payload}) => {
      return {...state, isLoading: payload};
    },
    [types.SET_PAGE_DEFAULT]: (state, {payload}) => {
      return {...state, page: 0};
    },
    [types.GET_TOP_PRODUCT_SUCCESS]: (state, {payload}) => {
      return {...state, topProduct: payload};
    },
    [types.GET_TOP_PRODUCT_FAILED]: (state, {payload}) => {
      return {...state, topProduct: {}};
    },
    [types.SET_LOADING_FUTURED_STORE]: (state, {payload}) => {
      return {...state, isLoadingFuturedStores: payload};
    },
    [types.GET_LIST_OF_FUTURED_STORE_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      return {
        ...state,
        page: PAGE_INIT,
        hasLoadMore: state.page < totalPages ? true : false,
        listOfFuturedStores: payload,
      };
    },
    [types.GET_LIST_OF_FUTURED_STORE_FAILED]: (state, {payload}) => {
      return {...state, listOfFuturedStores: {}};
    },
    [types.SET_LOADING_LOAD_MORE_FUTURED_STORE]: (state, {payload}) => {
      return {...state, isLoadMoreLoading: payload};
    },
    [types.GET_LIST_OF_FUTURED_STORE_LOAD_MORE_SUCCESS]: (state, {payload}) => {
      const {totalPages, content} = payload;
      payload.content =
        state.listOfFuturedStores?.content.concat(content) || [];
      return {
        ...state,
        listOfFuturedStores: payload,
        page: state.page + UNIT_INCREASE,
        hasLoadMore: state.page + 1 < totalPages ? true : false,
      };
    },
    [types.GET_LIST_OF_FUTURED_STORE_LOAD_MORE_FAILED]: (state, {payload}) => {
      return {...state};
    },
  },
  intialState,
);
