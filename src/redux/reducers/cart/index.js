import {createAction, handleActions} from 'redux-actions';
import {showMessage} from 'react-native-flash-message';

export const types = {
  //Loading
  SET_CART_LOADING: 'SET_CART_LOADING',
  SET_PAYMENT_LOADING: 'SET_PAYMENT_LOADING',
  SET_RECENT_LOADING: 'SET_RECENT_LOADING',
  SET_SUGGESTION_LOADING: 'SET_SUGGESTION_LOADING',

  //List Cart
  RESET_LIST_CART: 'RESET_LIST_CART',
  RESET_LIST_CART_SUCCESS: 'RESET_LIST_CART_SUCCESS',
  RESET_LIST_CART_FAILED: 'RESET_LIST_CART_FAILED',
  SET_LIST_CART: 'SET_LIST_CART',
  SET_LIST_CART_SUCCESS: 'SET_LIST_CART_SUCCESS',
  SET_LIST_CART_FAILED: 'SET_LIST_CART_FAILED',
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',

  //List Payment
  GET_LIST_PAYMENT: 'GET_LIST_PAYMENT',
  GET_LIST_PAYMENT_SUCCESS: 'GET_LIST_PAYMENT_SUCCESS',
  GET_LIST_PAYMENT_FAILED: 'GET_LIST_PAYMENT_FAILED',

  //List recent
  GET_LIST_RECENT: 'GET_LIST_RECENT',
  GET_LIST_RECENT_SUCCESS: 'GET_LIST_RECENT_SUCCESS',
  GET_LIST_RECENT_FAILED: 'GET_LIST_RECENT_FAILED',

  //List Suggestion
  GET_LIST_SUGGESTION: 'GET_LIST_SUGGESTION',
  GET_LIST_SUGGESTION_SUCCESS: 'GET_LIST_SUGGESTION_SUCCESS',
  GET_LIST_SUGGESTION_FAILED: 'GET_LIST_SUGGESTION_FAILED',

  //List coupon
  SET_CART_COUPON: 'SET_CART_COUPON',
  SET_CART_COUPON_SUCCESS: 'SET_CART_COUPON_SUCCESS',
  SET_CART_COUPON_FAILED: 'SET_CART_COUPON_FAILED',
  SET_CART_PAYMENT_METHOD: 'SET_CART_PAYMENT_METHOD',
  SET_CART_PAYMENT_METHOD_SUCCESS: 'SET_CART_PAYMENT_METHOD_SUCCESS',
  SET_CART_PAYMENT_METHOD_FAILED: 'SET_CART_PAYMENT_METHOD_FAILED',
};

export const actions = {
  //List Cart
  setCartLoading: createAction(types.SET_CART_LOADING),
  setListCart: createAction(types.SET_LIST_CART),
  setListCartSuccess: createAction(types.SET_LIST_CART_SUCCESS),
  setListCartFailed: createAction(types.SET_LIST_CART_FAILED),
  addItemToCart: createAction(types.ADD_ITEM_TO_CART),
  //List Payment
  setPaymentLoading: createAction(types.SET_PAYMENT_LOADING),
  getListPayment: createAction(types.GET_LIST_PAYMENT),
  getListPaymentSuccess: createAction(types.GET_LIST_PAYMENT_SUCCESS),
  getListPaymentFailed: createAction(types.GET_LIST_PAYMENT_FAILED),

  //List Recent
  setRecentLoading: createAction(types.SET_RECENT_LOADING),
  getListRecent: createAction(types.GET_LIST_RECENT),
  getListRecentSuccess: createAction(types.GET_LIST_RECENT_SUCCESS),
  getListRecentFailed: createAction(types.GET_LIST_RECENT_FAILED),

  //List Suggestion
  setSuggestionLoading: createAction(types.SET_SUGGESTION_LOADING),
  getListSuggestion: createAction(types.GET_LIST_SUGGESTION),
  getListSuggestionSuccess: createAction(types.GET_LIST_SUGGESTION_SUCCESS),
  getListSuggestionFailed: createAction(types.GET_LIST_SUGGESTION_FAILED),
};

const intialState = {
  //List Cart
  cartLoading: false,
  paymentLoading: false,
  recentLoading: false,
  suggestionLoading: false,
  loadCartMoreLoading: false,
  listCart: [],
  hasLoadMoreCart: false,
  pageCart: 0,
  limitCart: 12,
  couponCart: null,
  paymentCart: null,
  listPayment: [],
  listDelivery: [],
  listRecent: [],
  getListSuggestion: [],
};

export default handleActions(
  {
    //List Cart
    [types.SET_CART_LOADING]: (state, {payload}) => {
      return {...state, cartLoading: payload};
    },
    [types.ADD_ITEM_TO_CART]: (state, {payload}) => {
      const currentCart = state.listCart;
      const currentListItemId =
        currentCart.map((item) => {
          return item.item.id;
        }) || [];
      if (!currentListItemId.includes(payload.item.id)) {
        currentCart.push(payload);
        return {...state, cartLoading: currentCart};
      } else {
        return {...state, cartLoading: currentCart};
      }
    },
    [types.SET_LIST_CART_SUCCESS]: (state, {payload}) => {
      showMessage({
        message: 'Thêm vào giỏ hàng thành công',
        type: 'success',
      });
      return {
        ...state,
        listCart: [...state.listCart, payload],
        cartLoading: false,
      };
    },
    [types.SET_LIST_CART_FAILED]: (state, {payload}) => {
      return {
        ...state,
        cartLoading: false,
      };
    },
    //List Payment
    [types.SET_PAYMENT_LOADING]: (state, {payload}) => {
      return {...state, paymentLoading: payload};
    },
    [types.GET_LIST_PAYMENT_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        listPayment: payload,
        cartLoading: false,
      };
    },
    [types.GET_LIST_PAYMENT_FAILED]: (state, {payload}) => {
      return {
        ...state,
        cartLoading: false,
      };
    },
    //List Recent
    [types.SET_RECENT_LOADING]: (state, {payload}) => {
      return {...state, recentLoading: payload};
    },
    [types.GET_LIST_RECENT_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        listRecent: payload,
        recentLoading: false,
      };
    },
    [types.GET_LIST_RECENT_FAILED]: (state, {payload}) => {
      return {
        ...state,
        recentLoading: false,
      };
    },

    //List Suggestion
    [types.SET_SUGGESTION_LOADING]: (state, {payload}) => {
      return {...state, suggestionLoading: payload};
    },
    [types.GET_LIST_SUGGESTION_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        listSuggestion: payload,
        suggestionLoading: false,
      };
    },
    [types.GET_LIST_SUGGESTION_FAILED]: (state, {payload}) => {
      return {
        ...state,
        suggestionLoading: false,
      };
    },
  },
  intialState,
);
