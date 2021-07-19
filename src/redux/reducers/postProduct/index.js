import {createAction, handleActions} from 'redux-actions';

export const types = {
  //Brand -> STORE MAIN ALREADY EXIST
  SET_PRODUCT_INFO: 'SET_PRODUCT_INFO',
  CLEAR_PRODUCT_INFO: 'CLEAR_PRODUCT_INFO',

  //LIST ATTRIBUTES
  SET_LIST_ATTRIBUTES_LOADING: 'SET_LIST_ATTRIBUTES_LOADING',
  GET_LIST_ATTIBUTES: 'GET_LIST_ATTIBUTES',
  GET_LIST_ATTRIBUTES_SUCCESS: 'GET_LIST_ATTRIBUTES_SUCCESS',
  GET_LIST_ATTRIBUTES_FAILED: 'GET_LIST_ATTRIBUTES_FAILED',

  // LIST PRODUCT STATUS
  SET_LIST_PRODUCT_STATUS_LOADING: 'SET_LIST_PRODUCT_STATUS_LOADING',
  GET_LIST_PRODUCT_STATUS: 'GET_LIST_PRODUCT_STATUS',
  GET_LIST_PRODUCT_STATUS_SUCCESS: 'GET_LIST_PRODUCT_STATUS_SUCCESS',
  GET_LIST_PRODUCT_STATUS_FAILED: 'GET_LIST_PRODUCT_STATUS_FAILED',

  // LIST PAYMENT METHOD
  SET_LIST_PAYMENT_METHOD_LOADING: 'SET_LIST_PAYMENT_METHOD_LOADING',
  GET_LIST_PAYMENT_METHOD: 'GET_LIST_PAYMENT_METHOD',
  GET_LIST_PAYMENT_METHOD_SUCCESS: 'GET_LIST_PAYMENT_METHOD_SUCCESS',
  GET_LIST_PAYMENT_METHOD_FAILED: 'GET_LIST_PAYMENT_METHOD_FAILED',

  // LIST DELIVERY_TYPE
  SET_LIST_DELIVERY_TYPE_LOADING: 'SET_LIST_DELIVERY_TYPE_LOADING',
  GET_LIST_DELIVERY_TYPE: 'GET_LIST_DELIVERY_TYPE',
  GET_LIST_DELIVERY_TYPE_SUCCESS: 'GET_LIST_DELIVERY_TYPE_SUCCESS',
  GET_LIST_DELIVERY_TYPE_FAILED: 'GET_LIST_DELIVERY_TYPE_FAILED',

  // LIST USER HISTORY LOCATION
  SET_LIST_LOCATION_LOADING: 'SET_LIST_LOCATION_LOADING',
  GET_LIST_LOCATION: 'GET_LIST_LOCATION',
  GET_LIST_LOCATION_SUCCESS: 'GET_LIST_LOCATION_SUCCESS',
  GET_LIST_LOCATION_FAILED: 'GET_LIST_LOCATION_FAILED',

  // POST PRODUCT
  SET_POST_PRODUCT_LOADING: 'SET_POST_PRODUCT_LOADING',
  GET_POST_PRODUCT: 'GET_POST_PRODUCT_LOADING',
  GET_POST_PRODUCT_SUCCESS: 'GET_POST_PRODUCT_SUCCESS',
  GET_POST_PRODUCT_FAILED: 'GET_POST_PRODUCT_FAILED',
  //CLEAR POST PRODUCT
  CLEAR_POST_PRODUCT: 'CLEAR_POST_PRODUCT',
};

export const actions = {
  setProductInfo: createAction(types.SET_PRODUCT_INFO),
  clearPostInfo: createAction(types.CLEAR_PRODUCT_INFO),

  // ATTRIBUTES
  setListAttributesLoading: createAction(types.SET_LIST_ATTRIBUTES_LOADING),
  getListAttributes: createAction(types.GET_LIST_ATTIBUTES),
  getListAttributesSuccess: createAction(types.GET_LIST_ATTRIBUTES_SUCCESS),
  getListAttributesFailed: createAction(types.GET_LIST_ATTRIBUTES_FAILED),

  // PRODUCT STATUS
  setListProductStatusLoading: createAction(
    types.SET_LIST_PRODUCT_STATUS_LOADING,
  ),
  getListProductStatus: createAction(types.GET_LIST_PRODUCT_STATUS),
  getListProductStatusSuccess: createAction(
    types.GET_LIST_PRODUCT_STATUS_SUCCESS,
  ),
  getListProductStatusFailed: createAction(
    types.GET_LIST_PRODUCT_STATUS_FAILED,
  ),

  // PAYMENT METHOD
  setListPaymentMethodLoading: createAction(
    types.SET_LIST_PAYMENT_METHOD_LOADING,
  ),
  getListPaymentMethod: createAction(types.GET_LIST_PAYMENT_METHOD),
  getListPaymentMethodSuccess: createAction(
    types.GET_LIST_PAYMENT_METHOD_SUCCESS,
  ),
  getListPaymentMethodFailed: createAction(
    types.GET_LIST_PAYMENT_METHOD_FAILED,
  ),

  // DELIVERY TYPE
  setListDeliveryTypeLoading: createAction(
    types.SET_LIST_DELIVERY_TYPE_LOADING,
  ),
  getListDeliveryType: createAction(types.GET_LIST_DELIVERY_TYPE),
  getListDeliveryTypeSuccess: createAction(
    types.GET_LIST_DELIVERY_TYPE_SUCCESS,
  ),
  getListDeliveryTypeFailed: createAction(types.GET_LIST_DELIVERY_TYPE_FAILED),

  //LIST LOCATION

  setListLocationLoading: createAction(types.SET_LIST_LOCATION_LOADING),
  getListLocation: createAction(types.GET_LIST_LOCATION),
  getListLocationSuccess: createAction(types.GET_LIST_LOCATION_SUCCESS),
  getListLocationFailed: createAction(types.GET_LIST_LOCATION_FAILED),

  //POST PRODUCT
  setPostProductLoading: createAction(types.SET_POST_PRODUCT_LOADING),
  getPostProduct: createAction(types.GET_POST_PRODUCT),
  getPostProductFailed: createAction(types.GET_POST_PRODUCT_FAILED),
  getPostProductSuccess: createAction(types.GET_POST_PRODUCT_SUCCESS),
  //CLEAR_POST_PRODUCT
  clearPostProduct: createAction(types.CLEAR_POST_PRODUCT),
};

export const selectors = {
  getCategory: (state) => state.postProduct.category,
};

const defaultState = {
  //List attributes
  listAttributes: null,
  listAttributesLoading: false,

  //List product status
  listProductStatus: null,
  listProductStatusLoading: false,

  //List payment method
  listPaymentMethodLoading: false,
  listPaymentMethod: null,

  //List delivery type
  listDeliveryTypeLoading: false,
  listDeliveryType: null,

  //List LOCATION
  listLocationLoading: false,
  listLocation: null,

  // POST PRODUCT INFO

  //phase1
  category: null,
  childrenCategory: null,

  //phase2
  images: null,
  productName: '',
  description: '',
  brand: null,

  //phase3
  status: null,
  sizes: null,
  colors: null,
  attributeOptions: null,
  price: null,

  //phase4
  address: '',
  latitude: 0,
  longtitude: 0,
  paymentMethod: null,
  deliveryType: null,

  //end phase
  postProductLoading: false,
  postProductStatus: '',
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export default handleActions(
  {
    //List ATTRIBUTES
    [types.SET_PRODUCT_INFO]: (state, {payload}) => {
      return {
        ...state,
        ...payload,
      };
    },

    [types.CLEAR_PRODUCT_INFO]: (state) => {
      return defaultState;
    },
    [types.SET_LIST_ATTRIBUTES_LOADING]: (state, {payload}) => {
      return {
        ...state,
        listAttributesLoading: payload,
      };
    },
    [types.GET_LIST_ATTRIBUTES_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        listAttributes: payload,
      };
    },
    [types.GET_LIST_ATTRIBUTES_FAILED]: (state, {payload}) => {
      return {
        ...state,
      };
    },
    //LIST STATUS
    [types.SET_LIST_PRODUCT_STATUS_LOADING]: (state, {payload}) => {
      return {
        ...state,
        listProductStatusLoading: payload,
      };
    },
    [types.GET_LIST_PRODUCT_STATUS_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        listProductStatus: payload,
      };
    },
    [types.GET_LIST_PRODUCT_STATUS_FAILED]: (state, {payload}) => {
      return {
        ...state,
      };
    },
    // PAYMENT METHOD
    [types.SET_LIST_PRODUCT_STATUS_LOADING]: (state, {payload}) => {
      return {
        ...state,
        listPaymentMethodLoading: payload,
      };
    },
    [types.GET_LIST_PAYMENT_METHOD_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        listPaymentMethod: payload,
      };
    },
    [types.GET_LIST_PAYMENT_METHOD_FAILED]: (state, {payload}) => {
      return {
        ...state,
      };
    },

    // DELIVERY TYPE
    [types.SET_LIST_DELIVERY_TYPE_LOADING]: (state, {payload}) => {
      return {
        ...state,
        listDeliveryTypeLoading: payload,
      };
    },
    [types.GET_LIST_DELIVERY_TYPE_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        listDeliveryType: payload,
      };
    },
    [types.GET_LIST_DELIVERY_TYPE_FAILED]: (state, {payload}) => {
      return {
        ...state,
      };
    },

    // LIST LOCATION
    [types.SET_LIST_LOCATION_LOADING]: (state, {payload}) => {
      return {
        ...state,
        listLocationLoading: payload,
      };
    },
    [types.GET_LIST_LOCATION_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        listLocation: payload,
      };
    },
    [types.GET_LIST_LOCATION_FAILED]: (state, {payload}) => {
      return {
        ...state,
      };
    },
    [types.SET_POST_PRODUCT_LOADING]: (state, {payload}) => {
      return {
        ...state,
        postProductLoading: payload,
      };
    },
    [types.GET_POST_PRODUCT_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        postProductStatus: 'success',
      };
    },
    [types.GET_POST_PRODUCT_FAILED]: (state, {payload}) => {
      return {
        ...state,
        postProductStatus: 'failed',
      };
    },
    [types.CLEAR_POST_PRODUCT]: (state, {payload}) => {
      return {
        ...defaultState,
      };
    },
  },
  defaultState,
);
