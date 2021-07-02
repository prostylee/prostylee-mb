import {createAction} from 'redux-actions';
import {showMessage} from 'react-native-flash-message';

export const types = {
  // Order
  CREATE_ORDER_LOADING: 'CREATE_ORDER_LOADING',
  CREATE_ORDER: 'CREATE_ORDER',
  CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAILED: 'CREATE_ORDER_FAILED',

  SET_ORDER_DATA: 'SET_ORDER_DATA',
  SET_PAYMENT_METHOD_DATA: 'SET_PAYMENT_METHOD_DATA',
};

export const actions = {
  createOrderLoading: createAction(types.CREATE_ORDER_LOADING),
  createOrder: createAction(types.CREATE_ORDER),
  createOrderSuccess: createAction(types.CREATE_ORDER_SUCCESS),
  createOrderFailed: createAction(types.CREATE_ORDER_FAILED),

  setOrderData: createAction(types.SET_ORDER_DATA),
  setPaymentMethodData: createAction(types.SET_PAYMENT_METHOD_DATA),
};

export const intialState = {
  orderData: null,
  paymentMethod: null,
  createOrderLoading: false,
};

export const handleActions = {
  [types.CREATE_ORDER_LOADING]: (state, {payload}) => {
    return {
      ...state,
      createOrderLoading: payload,
    };
  },
  [types.SET_ORDER_DATA]: (state, {payload}) => {
    const order = {
      code: null,
      statusId: 0,
      status: 'CREATE_ORDER',
      ...payload,
    };
    return {
      ...state,
      orderData: order,
    };
  },
  [types.SET_PAYMENT_METHOD_DATA]: (state, {payload}) => {
    return {
      ...state,
      paymentMethod: payload,
    };
  },
};
