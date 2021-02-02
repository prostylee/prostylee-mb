import {createAction, handleActions} from 'redux-actions';

export const types = {
  UPDATE_NETWORK_STATUS: 'UPDATE_NETWORK_STATUS',
  TOGGLE_LOADING: 'TOGGLE_LOADING',
};

export const actions = {
  updateNetworkStatus: createAction(types.UPDATE_NETWORK_STATUS),
  toggleLoading: createAction(types.TOGGLE_LOADING),
};

export const selectors = {
  getNetworkStatus: (state) => state.data.networkStatus,
  getLoading: (state) => state.data.isLoading,
};

const defaultState = {
  networkStatus: true,
  isLoading: false,
};

export default handleActions(
  {
    [types.UPDATE_NETWORK_STATUS]: (state, {payload}) => {
      return {...state, networkStatus: payload};
    },
    [types.TOGGLE_LOADING]: (state, {payload}) => {
      return {...state, isLoading: payload};
    },
  },
  defaultState,
);
