import {createAction, handleActions} from 'redux-actions';
import {showMessage} from 'react-native-flash-message';

export const types = {
  //Loading
  SET_LIST_CART_ADDRESS_LOADING: 'SET_LIST_CART_ADDRESS_LOADING',
  GET_LIST_CART_ADDRESS: 'GET_LIST_CART_ADDRESS',
  GET_LIST_CART_ADDRESS_SUCCESS: 'GET_LIST_CART_ADDRESS_SUCCESS',
  GET_LIST_CART_ADDRESS_FAILED: 'GET_LIST_CART_ADDRESS_FAILED',

  SET_SELECTED_CART_ADDRESS: 'SET_SELECTED_CART_ADDRESS',
  SET_SELECTED_CART_ADDRESS_HISTORY: 'SET_SELECTED_CART_ADDRESS_HISTORY',
};

export const actions = {
  //AMOUN
  setListCartAddressLoading: createAction(types.SET_LIST_CART_ADDRESS_LOADING),
  getListCartAddress: createAction(types.GET_LIST_CART_ADDRESS),
  getListCartAddressSuccess: createAction(types.GET_LIST_CART_ADDRESS_SUCCESS),
  getListCartAddressFailed: createAction(types.GET_LIST_CART_ADDRESS_FAILED),

  setSelectedCartAddress: createAction(types.SET_SELECTED_CART_ADDRESS),
  setSelectedCartAddressHistory: createAction(
    types.SET_SELECTED_CART_ADDRESS_HISTORY,
  ),
};

const intialState = {
  isListCartAddressLoading: false,
  listCartAddress: null,
  selectedCartAddress: null,
  selectedCartAddressHistory: null,
};

const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export default handleActions(
  {
    [types.SET_LIST_CART_ADDRESS_LOADING]: (state, {payload}) => {
      return {
        ...state,
        isListCartAddressLoading: payload,
      };
    },
    [types.GET_LIST_CART_ADDRESS_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        listCartAddress: payload,
      };
    },
    [types.GET_LIST_CART_ADDRESS_FAILED]: (state, {payload}) => {
      return {
        ...state,
        listCartAddress: [],
      };
    },
    [types.SET_SELECTED_CART_ADDRESS]: (state, {payload}) => {
      return {
        ...state,
        selectedCartAddress: payload,
      };
    },
    [types.SET_SELECTED_CART_ADDRESS_HISTORY]: (state, {payload}) => {
      return {
        ...state,
        selectedCartAddressHistory: [
          payload,
          ...state?.selectedCartAddressHistory,
        ],
      };
    },
  },
  intialState,
);
