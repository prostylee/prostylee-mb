import {createAction, handleActions} from 'redux-actions';

export const types = {
  //List product from categories
  SET_LIST_BRAND_PRODUCT_LOADING: 'SET_LIST_BRAND_PRODUCT_LOADING',
  GET_LIST_BRAND_PRODUCT: 'GET_LIST_BRAND_PRODUCT',
  GET_LIST_BRAND_PRODUCT_SUCCESS: 'GET_LIST_BRAND_PRODUCT_SUCCESS',
  GET_LIST_BRAND_PRODUCT_FAILED: 'GET_LIST_BRAND_PRODUCT_FAILED',
  SET_PAGE_PRODUCT_DEFAULT: 'SET_PAGE_PRODUCT_DEFAULT',
  SET_LOADING_LOAD_MORE_PRODUCT: 'SET_LOADING_LOAD_MORE_PRODUCT',
  GET_LIST_BRAND_PRODUCT_LOAD_MORE: 'GET_LIST_BRAND_PRODUCT_LOAD_MORE',
  GET_LIST_BRAND_PRODUCT_LOAD_MORE_SUCCESS:
    'GET_LIST_BRAND_PRODUCT_LOAD_MORE_SUCCESS',
  GET_LIST_BRAND_PRODUCT_LOAD_MORE_FAILED:
    'GET_LIST_BRAND_PRODUCT_LOAD_MORE_FAILED',

  SET_PRODUCT_CATEGORIES_FILTER_STATE: 'SET_PRODUCT_CATEGORIES_FILTER_STATE',
  CLEAR_PRODUCT_CATEGORIES_FILTER_STATE:
    'CLEAR_PRODUCT_CATEGORIES_FILTER_STATE',
};

export const actions = {
  //List product from categories
  setListProductLoading: createAction(types.SET_LIST_BRAND_PRODUCT_LOADING),
  getListProduct: createAction(types.GET_LIST_BRAND_PRODUCT),
  getListProductSuccess: createAction(types.GET_LIST_BRAND_PRODUCT_SUCCESS),
  getListProductFailed: createAction(types.GET_LIST_BRAND_PRODUCT_FAILED),
  setPageProductDefault: createAction(types.SET_PAGE_PRODUCT_DEFAULT),

  setLoadingLoadMoreProduct: createAction(types.SET_LOADING_LOAD_MORE_PRODUCT),
  getListProductLoadMore: createAction(types.GET_LIST_BRAND_PRODUCT_LOAD_MORE),
  getListProductLoadMoreSuccess: createAction(
    types.GET_LIST_BRAND_PRODUCT_LOAD_MORE_SUCCESS,
  ),
  getListProductLoadMoreFailed: createAction(
    types.GET_LIST_BRAND_PRODUCT_LOAD_MORE_FAILED,
  ),
  //FILTER STATE
  setProductCategoriesFilterState: createAction(
    types.SET_PRODUCT_CATEGORIES_FILTER_STATE,
  ),
  clearProductCategoriesFilterState: createAction(
    types.CLEAR_PRODUCT_CATEGORIES_FILTER_STATE,
  ),
};

export const selectors = {
  getProducts: (state) => state.product.networkStatus,
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
  productCategoryFilterState: {},
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export default handleActions(
  {
    [types.GET_BRAND_PRODUCTS_SUCCESS]: (state, {payload}) => {
      return {...state, networkStatus: payload};
    },
    //List product from categories
    [types.SET_LIST_BRAND_PRODUCT_LOADING]: (state, {payload}) => {
      return {...state, listProductLoading: payload};
    },
    [types.GET_LIST_BRAND_PRODUCT_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      return {
        ...state,
        pagelistProductCategories: PAGE_INIT,
        hasLoadMoreProduct: state.pageProduct + 1 < totalPages ? true : false,
        listProduct: payload,
      };
    },
    [types.GET_LIST_BRAND_PRODUCT_FAILED]: (state, {payload}) => {
      console.log('GET FAILED');
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
    [types.GET_LIST_BRAND_PRODUCT_LOAD_MORE_SUCCESS]: (state, {payload}) => {
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
    [types.GET_LIST_BRAND_PRODUCT_LOAD_MORE_FAILED]: (state, {payload}) => {
      return {...state};
    },

    [types.SET_PRODUCT_CATEGORIES_FILTER_STATE]: (state, {payload}) => {
      return {
        ...state,
        productCategoryFilterState: {...payload},
      };
    },
    [types.CLEAR_PRODUCT_CATEGORIES_FILTER_STATE]: (state, {payload}) => {
      return {
        ...state,
        productCategoryFilterState: {
          attributes: {},
          category: -1,
          price: [0, 0],
        },
      };
    },
  },
  defaultState,
);
