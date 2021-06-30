import {createAction, handleActions} from 'redux-actions';

import {
  types as typesUserPost,
  actions as actionsUserPost,
  defaultState as defaultStateUserPost,
  handleActions as handleActionsUserPost,
} from './userPost';
export const types = {
  //List product from sale
  SET_LIST_PRODUCT_SALE_LOADING: 'SET_LIST_PRODUCT_SALE_LOADING',
  GET_LIST_PRODUCT_SALE: 'GET_LIST_PRODUCT_SALE',
  GET_LIST_PRODUCT_SALE_SUCCESS: 'GET_LIST_PRODUCT_SALE_SUCCESS',
  GET_LIST_PRODUCT_SALE_FAILED: 'GET_LIST_PRODUCT_SALE_FAILED',
  SET_PAGE_PRODUCT_SALE_DEFAULT: 'SET_PAGE_PRODUCT_SALE_DEFAULT',
  SET_LOADING_LOAD_MORE_PRODUCT_SALE: 'SET_LOADING_LOAD_MORE_PRODUCT_SALE',
  GET_LIST_PRODUCT_SALE_LOAD_MORE: 'GET_LIST_PRODUCT_SALE_LOAD_MORE',
  GET_LIST_PRODUCT_SALE_LOAD_MORE_SUCCESS:
    'GET_LIST_PRODUCT_SALE_LOAD_MORE_SUCCESS',
  GET_LIST_PRODUCT_SALE_LOAD_MORE_FAILED:
    'GET_LIST_PRODUCT_SALE_LOAD_MORE_FAILED',

  //List product from sold
  SET_LIST_PRODUCT_SOLD_LOADING: 'SET_LIST_PRODUCT_SOLD_LOADING',
  GET_LIST_PRODUCT_SOLD: 'GET_LIST_PRODUCT_SOLD',
  GET_LIST_PRODUCT_SOLD_SUCCESS: 'GET_LIST_PRODUCT_SOLD_SUCCESS',
  GET_LIST_PRODUCT_SOLD_FAILED: 'GET_LIST_PRODUCT_SOLD_FAILED',
  SET_PAGE_PRODUCT_SOLD_DEFAULT: 'SET_PAGE_PRODUCT_SOLD_DEFAULT',
  SET_LOADING_LOAD_MORE_PRODUCT_SOLD: 'SET_LOADING_LOAD_MORE_PRODUCT_SOLD',
  GET_LIST_PRODUCT_SOLD_LOAD_MORE: 'GET_LIST_PRODUCT_SOLD_LOAD_MORE',
  GET_LIST_PRODUCT_SOLD_LOAD_MORE_SUCCESS:
    'GET_LIST_PRODUCT_SOLD_LOAD_MORE_SUCCESS',
  GET_LIST_PRODUCT_SOLD_LOAD_MORE_FAILED:
    'GET_LIST_PRODUCT_SOLD_LOAD_MORE_FAILED',
  //List user post
  ...typesUserPost,
};

export const actions = {
  //List product from sale
  setListProductSaleLoading: createAction(types.SET_LIST_PRODUCT_SALE_LOADING),
  getListProductSale: createAction(types.GET_LIST_PRODUCT_SALE),
  getListProductSaleSuccess: createAction(types.GET_LIST_PRODUCT_SALE_SUCCESS),
  getListProductSaleFailed: createAction(types.GET_LIST_PRODUCT_SALE_FAILED),
  setPageProductSaleDefault: createAction(types.SET_PAGE_PRODUCT_SALE_DEFAULT),
  setLoadingLoadMoreProductSale: createAction(
    types.SET_LOADING_LOAD_MORE_PRODUCT_SALE,
  ),
  getListProductSaleLoadMore: createAction(
    types.GET_LIST_PRODUCT_SALE_LOAD_MORE,
  ),
  getListProductSaleLoadMoreSuccess: createAction(
    types.GET_LIST_PRODUCT_SALE_LOAD_MORE_SUCCESS,
  ),
  getListProductSaleLoadMoreFailed: createAction(
    types.GET_LIST_PRODUCT_SALE_LOAD_MORE_FAILED,
  ),

  //List product from sold
  setListProductSoldLoading: createAction(types.SET_LIST_PRODUCT_SOLD_LOADING),
  getListProductSold: createAction(types.GET_LIST_PRODUCT_SOLD),
  getListProductSoldSuccess: createAction(types.GET_LIST_PRODUCT_SOLD_SUCCESS),
  getListProductSoldFailed: createAction(types.GET_LIST_PRODUCT_SOLD_FAILED),
  setPageProductSoldDefault: createAction(types.SET_PAGE_PRODUCT_SOLD_DEFAULT),
  setLoadingLoadMoreProductSold: createAction(
    types.SET_LOADING_LOAD_MORE_PRODUCT_SOLD,
  ),
  getListProductSoldLoadMore: createAction(
    types.GET_LIST_PRODUCT_SOLD_LOAD_MORE,
  ),
  getListProductSoldLoadMoreSuccess: createAction(
    types.GET_LIST_PRODUCT_SOLD_LOAD_MORE_SUCCESS,
  ),
  getListProductSoldLoadMoreFailed: createAction(
    types.GET_LIST_PRODUCT_SOLD_LOAD_MORE_FAILED,
  ),
  //List user post
  ...actionsUserPost,
};

const defaultState = {
  //List product from sale
  listProductSaleLoading: false,
  loadProductSaleMoreLoading: false,
  listProductSale: {},
  hasLoadMoreProductSale: false,
  pageProductSale: 0,
  limitProductSale: 12,
  //List product from sold
  listProductSoldLoading: false,
  loadProductSoldMoreLoading: false,
  listProductSold: {},
  hasLoadMoreProductSold: false,
  pageProductSold: 0,
  limitProductSold: 12,
  //List user post
  ...defaultStateUserPost,
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export default handleActions(
  {
    //List product from sale
    [types.SET_LIST_PRODUCT_SALE_LOADING]: (state, {payload}) => {
      return {...state, listProductSaleLoading: payload};
    },
    [types.GET_LIST_PRODUCT_SALE_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      return {
        ...state,
        pagelistProductSale: PAGE_INIT,
        hasLoadMoreProductSale:
          state.pageProductSale + 1 < totalPages ? true : false,
        listProductSale: payload,
      };
    },
    [types.GET_LIST_PRODUCT_SALE_FAILED]: (state, {payload}) => {
      return {
        ...state,
        listProductSale: {},
        hasLoadMoreProductSale: false,
      };
    },
    [types.SET_PAGE_PRODUCT_SALE_DEFAULT]: (state, {payload}) => {
      return {...state, pageProductSale: 0};
    },
    [types.SET_LOADING_LOAD_MORE_PRODUCT_SALE]: (state, {payload}) => {
      return {...state, loadProductSaleMoreLoading: payload};
    },
    [types.GET_LIST_PRODUCT_SALE_LOAD_MORE_SUCCESS]: (state, {payload}) => {
      const {totalPages, content} = payload;
      payload.content = state.listProductSale?.content.concat(content) || [];
      return {
        ...state,
        listProductSale: payload,
        pageProductSale: state.pageProductSale + UNIT_INCREASE,
        hasLoadMoreProductSale:
          state.pageProductSale + UNIT_INCREASE + 1 < totalPages ? true : false,
      };
    },
    [types.GET_LIST_PRODUCT_SALE_LOAD_MORE_FAILED]: (state, {payload}) => {
      return {...state};
    },
    //List product from sold
    [types.SET_LIST_PRODUCT_SOLD_LOADING]: (state, {payload}) => {
      return {...state, listProductSoldLoading: payload};
    },
    [types.GET_LIST_PRODUCT_SOLD_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      return {
        ...state,
        pagelistProductSold: PAGE_INIT,
        hasLoadMoreProductSold:
          state.pageProductSold + 1 < totalPages ? true : false,
        listProductSold: payload,
      };
    },
    [types.GET_LIST_PRODUCT_SOLD_FAILED]: (state, {payload}) => {
      return {
        ...state,
        listProductSold: {},
        hasLoadMoreProductSold: false,
      };
    },
    [types.SET_PAGE_PRODUCT_SOLD_DEFAULT]: (state, {payload}) => {
      return {...state, pageProductSold: 0};
    },
    [types.SET_LOADING_LOAD_MORE_PRODUCT_SOLD]: (state, {payload}) => {
      return {...state, loadProductSoldMoreLoading: payload};
    },
    [types.GET_LIST_PRODUCT_SOLD_LOAD_MORE_SUCCESS]: (state, {payload}) => {
      const {totalPages, content} = payload;
      payload.content = state.listProductSold?.content.concat(content) || [];
      return {
        ...state,
        listProductSold: payload,
        pageProductSold: state.pageProductSold + UNIT_INCREASE,
        hasLoadMoreProductSold:
          state.pageProductSold + UNIT_INCREASE + 1 < totalPages ? true : false,
      };
    },
    [types.GET_LIST_PRODUCT_SOLD_LOAD_MORE_FAILED]: (state, {payload}) => {
      return {...state};
    },
    //LIST USER POST
    ...handleActionsUserPost,
  },
  defaultState,
);
