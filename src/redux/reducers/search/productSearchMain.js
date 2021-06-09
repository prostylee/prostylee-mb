import {createAction} from 'redux-actions';

export const types = {
  //List PRODUCT_SEARCH
  SET_PRODUCTS_SEARCH_LOADING: 'SET_PRODUCTS_SEARCH_LOADING',
  GET_PRODUCTS_SEARCH: 'GET_PRODUCTS_SEARCH',
  GET_PRODUCTS_SEARCH_SUCCESS: 'GET_PRODUCTS_SEARCH_SUCCESS',
  GET_PRODUCTS_SEARCH_FAILED: 'GET_PRODUCTS_SEARCH_FAILED',

  SET_PRODUCTS_SEARCH_LOADMORE_LOADING: 'SET_PRODUCTS_SEARCH_LOADMORE_LOADING',
  GET_PRODUCTS_SEARCH_LOADMORE: 'GET_PRODUCTS_SEARCH_LOADMORE',
  GET_PRODUCTS_SEARCH_LOADMORE_FAILED: 'GET_PRODUCTS_SEARCH_LOADMORE_FAILED',
  GET_PRODUCTS_SEARCH_LOADMORE_SUCCESS: 'GET_PRODUCTS_SEARCH_LOADMORE_SUCCESS',
};

export const actions = {
  //List FEATURED_PRODUCT_SEARCH
  setProductsSearchLoading: createAction(types.SET_PRODUCTS_SEARCH_LOADING),
  getProductsSearch: createAction(types.GET_PRODUCTS_SEARCH),
  getProductsSearchSuccess: createAction(types.GET_PRODUCTS_SEARCH_SUCCESS),
  getProductsSearchFailed: createAction(types.GET_PRODUCTS_SEARCH_FAILED),

  setProductsSearchLoadmoreLoading: createAction(
    types.SET_PRODUCTS_SEARCH_LOADMORE_LOADING,
  ),
  getProductsSearchLoadmore: createAction(types.GET_PRODUCTS_SEARCH_LOADMORE),
  getProductsSearchLoadmoreFailed: createAction(
    types.GET_PRODUCTS_SEARCH_LOADMORE_FAILED,
  ),
  getProductsSearchLoadmoreSuccess: createAction(
    types.GET_PRODUCTS_SEARCH_LOADMORE_SUCCESS,
  ),
};

export const defaultState = {
  //List products_SEARCH
  productsSearchLoading: false,
  productSearchList: {},
  pageProductSearch: 0,
  limitProductSearch: 12,
  productsSearchStatus: false,
  hasProductSearchLoadMore: false,
  productSearchLoadmoreLoading: false,
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;

export const handleActions = {
  //List PRODUCT_SEARCH
  [types.SET_PRODUCTS_SEARCH_LOADING]: (state, {payload}) => {
    return {...state, productsSearchLoading: payload};
  },
  [types.GET_PRODUCTS_SEARCH_FAILED]: (state, {payload}) => {
    return {
      ...state,
      productsSearchStatus: false,
    };
  },
  [types.GET_PRODUCTS_SEARCH_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    return {
      ...state,
      productSearchList: payload,
      productsSearchStatus: true,
      pageProductSearch: PAGE_INIT,
      hasProductSearchLoadMore:
        state.pageProductSearch + UNIT_INCREASE + 1 < totalPages ? true : false,
    };
  },
  [types.SET_PRODUCTS_SEARCH_LOADMORE_LOADING]: (state, {payload}) => {
    return {...state, productSearchLoadmoreLoading: payload};
  },
  [types.GET_PRODUCTS_SEARCH_LOADMORE_SUCCESS]: (state, {payload}) => {
    const {totalPages, content} = payload;
    payload.content = state.productSearchList?.content.concat(content) || [];
    return {
      ...state,
      productSearchList: payload,
      pageProductSearch: state.pageProductSearch + UNIT_INCREASE,
      hasProductSearchLoadMore:
        state.hasProductSearchLoadMore + UNIT_INCREASE + 1 < totalPages
          ? true
          : false,
    };
  },
  [types.GET_PRODUCTS_SEARCH_LOADMORE_FAILED]: (state, {payload}) => {
    return {...state};
  },
};
