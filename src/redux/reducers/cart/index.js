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
  SET_VOUCHER_LOADING: 'SET_VOUCHER_LOADING',

  //List Payment
  GET_LIST_PAYMENT: 'GET_LIST_PAYMENT',
  GET_LIST_PAYMENT_SUCCESS: 'GET_LIST_PAYMENT_SUCCESS',
  GET_LIST_PAYMENT_FAILED: 'GET_LIST_PAYMENT_FAILED',
  SET_PAYMENT_USE: 'SET_PAYMENT_USE',

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

  //List voucher
  SET_VOUCHER_LOADING: 'SET_VOUCHER_LOADING',
  GET_LIST_VOUCHER: 'GET_LIST_VOUCHER',
  GET_LIST_VOUCHER_SUCCESS: 'GET_LIST_VOUCHER_SUCCESS',
  GET_LIST_VOUCHER_FAILED: 'GET_LIST_VOUCHER_FAILED',
  SET_PAGE_VOUCHER_DEFAULT: 'SET_PAGE_VOUCHER_DEFAULT',
  SET_LOADING_LOAD_MORE_VOUCHER: 'SET_LOADING_LOAD_MORE_VOUCHER',
  GET_LIST_VOUCHER_LOAD_MORE: 'GET_LIST_VOUCHER_LOAD_MORE',
  GET_LIST_VOUCHER_LOAD_MORE_SUCCESS: 'GET_LIST_VOUCHER_LOAD_MORE_SUCCESS',
  GET_LIST_VOUCHER_LOAD_MORE_FAILED: 'GET_LIST_VOUCHER_LOAD_MORE_FAILED',
  SET_VOUCHER_USE: 'SET_VOUCHER_USE',
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
  setPaymentUse: createAction(types.SET_PAYMENT_USE),

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

  //List Voucher
  setVoucherLoading: createAction(types.SET_VOUCHER_LOADING),
  getListVoucher: createAction(types.GET_LIST_VOUCHER),
  getListVoucherSuccess: createAction(types.GET_LIST_VOUCHER_SUCCESS),
  getListVoucherFailed: createAction(types.GET_LIST_VOUCHER_FAILED),
  setPageVoucherDefault: createAction(types.SET_PAGE_VOUCHER_DEFAULT),

  setLoadingLoadMoreVoucher: createAction(types.SET_LOADING_LOAD_MORE_VOUCHER),
  getListVoucherLoadMore: createAction(types.GET_LIST_VOUCHER_LOAD_MORE),
  getListVoucherLoadMoreSuccess: createAction(
    types.GET_LIST_VOUCHER_LOAD_MORE_SUCCESS,
  ),
  getListVoucherLoadMoreFailed: createAction(
    types.GET_LIST_VOUCHER_LOAD_MORE_FAILED,
  ),

  setVoucherUse: createAction(types.SET_VOUCHER_USE),
};

const intialState = {
  //List Cart
  cartLoading: false,
  loadCartMoreLoading: false,
  listCart: [],
  hasLoadMoreCart: false,
  pageCart: 0,
  limitCart: 12,
  couponCart: null,
  paymentCart: null,

  //List payment
  paymentLoading: false,
  listPayment: [],
  paymentUse: null,

  //List Recent
  recentLoading: false,
  listRecent: [],

  //List suggestion
  suggestionLoading: false,
  listSuggestion: [],

  //List Delivery
  listDelivery: [],

  //List Voucher
  voucherLoading: false,
  loadVoucherMoreLoading: false,
  listVoucher: {},
  hasLoadMoreVoucher: false,
  pageVoucher: 0,
  limitVoucher: 12,
  voucherUse: null,
};

const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
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
        showMessage({
          message: 'Thêm vào giỏ hàng thành công',
          type: 'success',
        });
        return {...state, listCart: currentCart};
      } else {
        showMessage({
          message: 'Thêm vào giỏ hàng thành công',
          type: 'success',
        });
        return {...state, listCart: currentCart};
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
    [types.SET_PAYMENT_USE]: (state, {payload}) => {
      return {...state, paymentUse: payload};
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

    //List Voucher
    [types.SET_VOUCHER_LOADING]: (state, {payload}) => {
      return {...state, voucherLoading: payload};
    },
    [types.GET_LIST_VOUCHER_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      return {
        ...state,
        pageVoucher: PAGE_INIT,
        hasLoadMoreVoucher: state.pageVoucher + 1 < totalPages ? true : false,
        listVoucher: payload,
      };
    },
    [types.GET_LIST_VOUCHER_FAILED]: (state, {payload}) => {
      return {
        ...state,
        listVoucher: {},
        hasLoadMoreVoucher: false,
      };
    },
    [types.SET_PAGE_VOUCHER_DEFAULT]: (state, {payload}) => {
      return {...state, pageVoucher: 0};
    },
    [types.SET_LOADING_LOAD_MORE_VOUCHER]: (state, {payload}) => {
      return {...state, loadVoucherMoreLoading: payload};
    },
    [types.GET_LIST_VOUCHER_LOAD_MORE_SUCCESS]: (state, {payload}) => {
      const {totalPages, content} = payload;
      payload.content = state.listVoucher?.content.concat(content) || [];
      return {
        ...state,
        listVoucher: payload,
        pageVoucher: state.pageVoucher + UNIT_INCREASE,
        hasLoadMoreVoucher:
          state.pageVoucher + UNIT_INCREASE + 1 < totalPages ? true : false,
      };
    },
    [types.GET_LIST_VOUCHER_LOAD_MORE_FAILED]: (state, {payload}) => {
      return {...state};
    },

    [types.SET_VOUCHER_USE]: (state, {payload}) => {
      return {...state, voucherUse: payload};
    },
  },
  intialState,
);
