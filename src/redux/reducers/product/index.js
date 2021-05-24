import {createAction, handleActions} from 'redux-actions';

export const types = {
  GET_PRODUCTS: 'GET_PRODUCTS',
  GET_PRODUCTS_SUCCESS: 'GET_PRODUCTS_SUCCESS',
  //List product from categories
  SET_LIST_PRODUCT_LOADING: 'SET_LIST_PRODUCT_LOADING',
  GET_LIST_PRODUCT: 'GET_LIST_PRODUCT',
  GET_LIST_PRODUCT_SUCCESS: 'GET_LIST_PRODUCT_SUCCESS',
  GET_LIST_PRODUCT_FAILED: 'GET_LIST_PRODUCT_FAILED',
  SET_PAGE_PRODUCT_DEFAULT: 'SET_PAGE_PRODUCT_DEFAULT',
  SET_LOADING_LOAD_MORE_PRODUCT: 'SET_LOADING_LOAD_MORE_PRODUCT',
  GET_LIST_PRODUCT_LOAD_MORE: 'GET_LIST_PRODUCT_LOAD_MORE',
  GET_LIST_PRODUCT_LOAD_MORE_SUCCESS: 'GET_LIST_PRODUCT_LOAD_MORE_SUCCESS',
  GET_LIST_PRODUCT_LOAD_MORE_FAILED: 'GET_LIST_PRODUCT_LOAD_MORE_FAILED',

  GET_PRODUCT_BY_ID_LOADING: 'GET_PRODUCT_BY_ID_LOADING',
  GET_PRODUCT_BY_ID: 'GET_PRODUCT_BY_ID',
  GET_PRODUCT_BY_ID_SUCCESS: 'GET_PRODUCT_BY_ID_SUCCESS',
  GET_PRODUCT_BY_ID_FAILED: 'GET_PRODUCT_BY_ID_FAILED',
};

export const actions = {
  getProducts: createAction(types.GET_PRODUCTS),
  getProductsSuccess: createAction(types.GET_PRODUCTS_SUCCESS),
  //List product from categories
  setListProductLoading: createAction(types.SET_LIST_PRODUCT_LOADING),
  getListProduct: createAction(types.GET_LIST_PRODUCT),
  getListProductSuccess: createAction(types.GET_LIST_PRODUCT_SUCCESS),
  getListProductFailed: createAction(types.GET_LIST_PRODUCT_FAILED),
  setPageProductDefault: createAction(types.SET_PAGE_PRODUCT_DEFAULT),

  setLoadingLoadMoreProduct: createAction(types.SET_LOADING_LOAD_MORE_PRODUCT),
  getListProductLoadMore: createAction(types.GET_LIST_PRODUCT_LOAD_MORE),
  getListProductLoadMoreSuccess: createAction(
    types.GET_LIST_PRODUCT_LOAD_MORE_SUCCESS,
  ),
  getListProductLoadMoreFailed: createAction(
    types.GET_LIST_PRODUCT_LOAD_MORE_FAILED,
  ),

  getProductByIdLoading: createAction(types.GET_PRODUCT_BY_ID_LOADING),
  getProductById: createAction(types.GET_PRODUCT_BY_ID),
  getProductByIdSuccess: createAction(types.GET_PRODUCT_BY_ID_SUCCESS),
  getProductByIdFail: createAction(types.GET_PRODUCT_BY_ID_FAILED),
};

export const selectors = {
  getProducts: (state) => state.product.networkStatus,
  getProductDetail: (state) => state.product.productDetail,
};

const defaultState = {
  products: null,
  //List product from categories
  listProductLoading: false,
  loadProductMoreLoading: false,
  listProduct: {},
  hasLoadMoreProduct: false,
  pageProduct: 0,
  limitProduct: 12,
  // Product detail
  productDetail: {},
  productDetailLoading: false,
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export default handleActions(
  {
    [types.GET_PRODUCTS_SUCCESS]: (state, {payload}) => {
      return {...state, networkStatus: payload};
    },
    //List product from categories
    [types.SET_LIST_PRODUCT_LOADING]: (state, {payload}) => {
      return {...state, listProductLoading: payload};
    },
    [types.GET_LIST_PRODUCT_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      return {
        ...state,
        pagelistProductCategories: PAGE_INIT,
        hasLoadMoreProduct: state.pageProduct + 1 < totalPages ? true : false,
        listProduct: payload,
      };
    },
    [types.GET_LIST_PRODUCT_FAILED]: (state, {payload}) => {
      return {
        ...state,
        listProduct: {},
        hasLoadMoreProduct: false,
      };
    },
    [types.SET_PAGE_PRODUCT_DEFAULT]: (state, {payload}) => {
      return {...state, pageProduct: 0};
    },
    [types.SET_LOADING_LOAD_MORE_PRODUCT]: (state, {payload}) => {
      return {...state, loadProductMoreLoading: payload};
    },
    [types.GET_LIST_PRODUCT_LOAD_MORE_SUCCESS]: (state, {payload}) => {
      const {totalPages, content} = payload;
      payload.content = state.listProduct?.content.concat(content) || [];
      return {
        ...state,
        listProduct: payload,
        pageProduct: state.pageProduct + UNIT_INCREASE,
        hasLoadMoreProduct:
          state.pageProduct + UNIT_INCREASE + 1 < totalPages ? true : false,
      };
    },
    [types.GET_LIST_PRODUCT_LOAD_MORE_FAILED]: (state, {payload}) => {
      return {...state};
    },
    [types.GET_PRODUCT_BY_ID_LOADING]: (state, {payload}) => {
      return {...state, productDetailLoading: payload};
    },
    [types.GET_PRODUCT_BY_ID_SUCCESS]: (state, {payload}) => {
      return {...state, productDetail: payload};
    },
    [types.GET_PRODUCT_BY_ID_FAILED]: (state, {payload}) => {
      return {...state, productDetail: {}};
    },
  },
  defaultState,
);
