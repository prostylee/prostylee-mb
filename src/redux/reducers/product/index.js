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

  GET_PRODUCT_COMMENTS_LOADING: 'GET_PRODUCT_COMMENTS_LOADING',
  GET_PRODUCT_COMMENTS: 'GET_PRODUCT_COMMENTS',
  GET_PRODUCT_COMMENTS_SUCCESS: 'GET_PRODUCT_COMMENTS_SUCCESS',
  GET_PRODUCT_COMMENTS_FAILED: 'GET_PRODUCT_COMMENTS_FAILED',
  GET_PRODUCT_COMMENTS_AVERAGE_SUCCESS: 'GET_PRODUCT_COMMENTS_AVERAGE_SUCCESS',
  GET_PRODUCT_COMMENTS_AVERAGE_FAILED: 'GET_PRODUCT_COMMENTS_AVERAGE_FAILED',

  GET_PRODUCT_RELATED_LOADING: 'GET_PRODUCT_RELATED_LOADING',
  GET_PRODUCT_RELATED: 'GET_PRODUCT_RELATED',
  GET_PRODUCT_RELATED_SUCCESS: 'GET_PRODUCT_RELATED_SUCCESS',
  GET_PRODUCT_RELATED_FAILED: 'GET_PRODUCT_RELATED_FAILED',

  GET_PRODUCT_COORDINATED_LOADING: 'GET_PRODUCT_COORDINATED_LOADING',
  GET_PRODUCT_COORDINATED: 'GET_PRODUCT_COORDINATED',
  GET_PRODUCT_COORDINATED_SUCCESS: 'GET_PRODUCT_COORDINATED_SUCCESS',
  GET_PRODUCT_COORDINATED_FAILED: 'GET_PRODUCT_COORDINATED_FAILED',
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

  getProductCommentsLoading: createAction(types.GET_PRODUCT_COMMENTS_LOADING),
  getProductComments: createAction(types.GET_PRODUCT_COMMENTS),
  getProductCommentsSuccess: createAction(types.GET_PRODUCT_COMMENTS_SUCCESS),
  getProductCommentsFail: createAction(types.GET_PRODUCT_COMMENTS_FAILED),
  getProductCommentsAverageSuccess: createAction(
    types.GET_PRODUCT_COMMENTS_AVERAGE_SUCCESS,
  ),
  getProductCommentsAverageFail: createAction(
    types.GET_PRODUCT_COMMENTS_AVERAGE_FAILED,
  ),

  getProductRelatedLoading: createAction(types.GET_PRODUCT_RELATED_LOADING),
  getProductRelated: createAction(types.GET_PRODUCT_RELATED),
  getProductRelatedSuccess: createAction(types.GET_PRODUCT_RELATED_SUCCESS),
  getProductRelatedFail: createAction(types.GET_PRODUCT_RELATED_FAILED),

  getProductCoordinatedLoading: createAction(
    types.GET_PRODUCT_COORDINATED_LOADING,
  ),
  getProductCoordinated: createAction(types.GET_PRODUCT_COORDINATED),
  getProductCoordinatedSuccess: createAction(
    types.GET_PRODUCT_COORDINATED_SUCCESS,
  ),
  getProductCoordinatedFail: createAction(types.GET_PRODUCT_COORDINATED_FAILED),
};

export const selectors = {
  getProducts: (state) => state.product.networkStatus,
  getProductDetail: (state) => state.product.productDetail,
  getProductDetailLoading: (state) => state.product.productDetailLoading,
  getProductComments: (state) => state.product.productDetailComments,
  getProductCommentsAverage: (state) =>
    state.product.productDetailCommentsAverage,
  getProductRelated: (state) => state.product.productRelated,
  getProductCoordinated: (state) => state.product.productCoordinated,
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
  productDetailComments: {},
  productDetailCommentsLoading: false,
  productDetailCommentsAverage: 0,
  productRelated: {},
  productRelatedLoading: false,
  productCoordinated: {},
  productCoordinatedLoading: false,
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

    [types.GET_PRODUCT_COMMENTS_LOADING]: (state, {payload}) => {
      return {...state, productDetailCommentsLoading: payload};
    },
    [types.GET_PRODUCT_COMMENTS_SUCCESS]: (state, {payload}) => {
      return {...state, productDetailComments: payload};
    },
    [types.GET_PRODUCT_COMMENTS_FAILED]: (state, {payload}) => {
      return {...state, productDetailComments: {}};
    },

    [types.GET_PRODUCT_COMMENTS_AVERAGE_SUCCESS]: (state, {payload}) => {
      return {...state, productDetailCommentsAverage: payload};
    },
    [types.GET_PRODUCT_COMMENTS_AVERAGE_FAILED]: (state, {payload}) => {
      return {...state, productDetailCommentsAverage: 0};
    },

    [types.GET_PRODUCT_RELATED_LOADING]: (state, {payload}) => {
      return {...state, productRelatedLoading: payload};
    },
    [types.GET_PRODUCT_RELATED_SUCCESS]: (state, {payload}) => {
      return {...state, productRelated: payload};
    },
    [types.GET_PRODUCT_RELATED_FAILED]: (state, {payload}) => {
      return {...state, productRelated: {}};
    },

    [types.GET_PRODUCT_COORDINATED_LOADING]: (state, {payload}) => {
      return {...state, productCoordinatedLoading: payload};
    },
    [types.GET_PRODUCT_COORDINATED_SUCCESS]: (state, {payload}) => {
      return {...state, productCoordinated: payload};
    },
    [types.GET_PRODUCT_COORDINATED_FAILED]: (state, {payload}) => {
      return {...state, productCoordinated: {}};
    },
  },
  defaultState,
);
