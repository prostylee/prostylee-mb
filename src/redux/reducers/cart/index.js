import {createAction, handleActions} from 'redux-actions';

export const types = {
  //List cart

  SET_CART_LOADING: 'SET_CART_LOADING',
  RESET_LIST_CART: 'RESET_LIST_CART',
  RESET_LIST_CART_SUCCESS: 'RESET_LIST_CART_SUCCESS',
  RESET_LIST_CART_FAILED: 'RESET_LIST_CART_FAILED',
  SET_LIST_CART: 'GET_LIST_CART',
  SET_LIST_CART_SUCCESS: 'GET_LIST_CART_SUCCESS',
  SET_LIST_CART_FAILED: 'GET_LIST_CART_FAILED',
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
};
const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export default handleActions(
  {
    //List Cart
    [types.SET_CART_LOADING]: (state, {payload}) => {
      return {...state, cartLoading: payload};
    },
    [types.SET_LIST_CART_SUCCESS]: (state, {payload}) => {
      const {totalPages} = payload;
      return {
        ...state,
        pageCart: PAGE_INIT,
        hasLoadMoreCart: state.pageCart + 1 < totalPages ? true : false,
        listCart: payload,
      };
    },
    [types.SET_LIST_CART_FAILED]: (state, {payload}) => {
      return {
        ...state,
        listCart: [],
        hasLoadMoreCart: false,
      };
    },
  },
  intialState,
);
