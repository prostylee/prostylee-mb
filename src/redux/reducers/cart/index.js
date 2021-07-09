import {createAction, handleActions} from 'redux-actions';
import {showMessage} from 'react-native-flash-message';
import {getProductVarient} from 'utils/product';
import i18n from 'i18n';

import {
  types as typesCartAddress,
  actions as actionsCartAddress,
  defaultState as defaultStateCartAddress,
  handleActions as handleActionsCartAddress,
} from './cartAddress';

import {
  types as typesOrder,
  actions as actionsOrder,
  defaultState as defaultStateOrder,
  handleActions as handleActionsOrder,
} from './order';

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
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  //AMOUNT
  SET_CART_AMOUNT: 'SET_CART_AMOUNT',
  //OPTION
  SET_CART_ITEM_UPDATE_OPTION: 'SET_CART_ITEM_UPDATE_OPTION',

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

  //List Delivery
  SET_DELIVERY_LOADING: 'SET_DELIVERY_LOADING',
  GET_LIST_DELIVERY: 'GET_LIST_DELIVERY',
  GET_LIST_DELIVERY_SUCCESS: 'GET_LIST_DELIVERY_SUCCESS',
  GET_LIST_DELIVERY_FAILED: 'GET_LIST_DELIVERY_FAILED',

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
  // CART ADDRESS
  ...typesCartAddress,
  // ORDER
  ...typesOrder,
};

export const actions = {
  //List Cart
  setCartLoading: createAction(types.SET_CART_LOADING),
  setListCart: createAction(types.SET_LIST_CART),
  setListCartSuccess: createAction(types.SET_LIST_CART_SUCCESS),
  setListCartFailed: createAction(types.SET_LIST_CART_FAILED),
  addItemToCart: createAction(types.ADD_ITEM_TO_CART),
  removeItemFromCart: createAction(types.REMOVE_ITEM_FROM_CART),
  updateItemOption: createAction(types.SET_CART_ITEM_UPDATE_OPTION),
  resetListCart: createAction(types.RESET_LIST_CART),
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

  //List Delivery
  setDeliveryLoading: createAction(types.SET_DELIVERY_LOADING),
  getListDelivery: createAction(types.GET_LIST_DELIVERY),
  getListDeliverySuccess: createAction(types.GET_LIST_DELIVERY_SUCCESS),
  getListDeliveryFailed: createAction(types.GET_LIST_DELIVERY_FAILED),

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

  //AMOUN
  setCartAmount: createAction(types.SET_CART_AMOUNT),

  //CART ADDRESS
  ...actionsCartAddress,

  // ORDER
  ...actionsOrder,
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
  deliveryLoading: false,
  listDelivery: [],

  //List Voucher
  voucherLoading: false,
  loadVoucherMoreLoading: false,
  listVoucher: {},
  hasLoadMoreVoucher: false,
  pageVoucher: 0,
  limitVoucher: 12,
  voucherUse: null,
  //CART ADDRESS
  ...defaultStateCartAddress,
  // ORDER
  ...defaultStateOrder,
};

const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export default handleActions(
  {
    //List Cart
    [types.RESET_LIST_CART]: (state, {payload}) => {
      return intialState;
    },
    [types.SET_CART_LOADING]: (state, {payload}) => {
      return {...state, cartLoading: payload};
    },
    [types.ADD_ITEM_TO_CART]: (state, {payload}) => {
      const currentCart = state.listCart;
      const currentListItemVarient =
        currentCart.map((item) => {
          return item.productVarient;
        }) || [];
      const productVarient = `${payload.item.id}${getProductVarient(
        payload.options,
      )}`;
      if (!currentListItemVarient.includes(productVarient)) {
        currentCart.push({...payload, productVarient: productVarient});
        showMessage({
          message: i18n.t('cart.addToCartSuccess'),
          type: 'success',
          position: 'top',
        });
        return {...state, listCart: currentCart};
      } else {
        const existedProductIndex = currentCart.findIndex(
          (item) => item.productVarient === productVarient,
        );
        let existedProduct = currentCart[existedProductIndex];
        existedProduct.quantity = existedProduct.quantity + 1;
        const newCart = [
          ...currentCart.slice(0, existedProductIndex),
          existedProduct,
          ...currentCart.slice(existedProductIndex + 1),
        ];
        showMessage({
          message: i18n.t('cart.addToCartSuccess'),
          type: 'success',
          position: 'top',
        });
        return {...state, listCart: newCart};
      }
    },
    [types.REMOVE_ITEM_FROM_CART]: (state, {payload}) => {
      const currentCart = state.listCart;
      const removeItemIndex = currentCart.findIndex(
        (item) => item.item.id === payload.id,
      );
      if (removeItemIndex >= 0) {
        const newCartList = [
          ...currentCart.slice(0, removeItemIndex),
          ...currentCart.slice(removeItemIndex + 1),
        ];
        return {...state, listCart: newCartList};
      } else {
        return state;
      }
    },
    [types.SET_CART_ITEM_UPDATE_OPTION]: (state, {payload}) => {
      const currentCart = state.listCart;
      const itemVarientId = payload.itemVarientId ? payload.itemVarientId : 0;
      const newItemVarientId = payload.newItemVarientId
        ? payload.newItemVarientId
        : 0;

      if (itemVarientId === newItemVarientId) {
        return state;
      }

      if (itemVarientId) {
        const findCartIndex = currentCart.findIndex(
          (element) => element.productVarient === itemVarientId,
        );
        const existedItemVarient = currentCart.findIndex(
          (element) => element.productVarient === newItemVarientId,
        );

        if (existedItemVarient >= 0) {
          const newItem = Object.assign({}, currentCart[existedItemVarient]);
          newItem.quantity =
            newItem.quantity + currentCart[findCartIndex].quantity;
          if (findCartIndex < existedItemVarient) {
            const newCartList = [
              ...currentCart.slice(0, findCartIndex),
              ...currentCart.slice(findCartIndex + 1, existedItemVarient),
              newItem,
              ...currentCart.slice(existedItemVarient + 1),
            ];
            return {...state, listCart: newCartList};
          } else {
            const newCartList = [
              ...currentCart.slice(0, existedItemVarient),
              newItem,
              ...currentCart.slice(existedItemVarient + 1, findCartIndex),
              ...currentCart.slice(findCartIndex + 1),
            ];
            return {...state, listCart: newCartList};
          }
        } else {
          const newItem = Object.assign({}, currentCart[findCartIndex]);
          const newOptions = payload.newOptions
            ? payload.newOptions
            : newItem.options;
          newItem.options = newOptions;
          newItem.productVarient = newItemVarientId;
          const newCartList = [
            ...currentCart.slice(0, findCartIndex),
            newItem,
            ...currentCart.slice(findCartIndex + 1),
          ];
          return {...state, listCart: newCartList};
        }
      } else {
        return state;
      }
    },
    [types.SET_CART_AMOUNT]: (state, {payload}) => {
      const {newAmount, productVarient} = payload;
      const currentCart = new Array(...state.listCart);
      const findCartIndex = currentCart.findIndex(
        (element) => element.productVarient === productVarient,
      );
      if (findCartIndex >= 0) {
        currentCart[findCartIndex].quantity = newAmount;
        return {...state, listCart: currentCart};
      } else {
        return {...state, listCart: currentCart};
      }
    },

    [types.SET_LIST_CART_SUCCESS]: (state, {payload}) => {
      showMessage({
        message: 'Thêm vào giỏ hàng thành công',
        type: 'success',
        position: 'top',
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
    [types.SET_DELIVERY_LOADING]: (state, {payload}) => {
      return {...state, deliveryLoading: payload};
    },
    [types.GET_LIST_DELIVERY_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        listDelivery: payload,
        deliveryLoading: false,
      };
    },
    [types.GET_LIST_DELIVERY_FAILED]: (state, {payload}) => {
      return state;
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
    // CART ADDRESS
    ...handleActionsCartAddress,
    // ORDER
    ...handleActionsOrder,
  },
  intialState,
);
