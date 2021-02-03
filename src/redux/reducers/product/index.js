import {createAction, handleActions} from 'redux-actions';

export const types = {
  GET_PRODUCTS: 'GET_PRODUCTS',
  GET_PRODUCTS_SUCCESS: 'GET_PRODUCTS_SUCCESS',
};

export const actions = {
  getProducts: createAction(types.GET_PRODUCTS),
  getProductsSuccess: createAction(types.GET_PRODUCTS_SUCCESS),
};

export const selectors = {
  getProducts: (state) => state.product.networkStatus,
};

const defaultState = {
  products: null,
};

export default handleActions(
  {
    [types.GET_PRODUCTS_SUCCESS]: (state, {payload}) => {
      return {...state, networkStatus: payload};
    },
  },
  defaultState,
);
