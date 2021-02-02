import {createAction, handleActions} from 'redux-actions';

export const types = {
  UPDATE_NETWORK_STATUS: 'UPDATE_NETWORK_STATUS',
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  TOGGLE_THEME_MODE: 'TOGGLE_THEME_MODE',
};

export const actions = {
  updateNetworkStatus: createAction(types.UPDATE_NETWORK_STATUS),
  toggleLoading: createAction(types.TOGGLE_LOADING),
  toggleThemeMode: createAction(types.TOGGLE_THEME_MODE),
};

export const selectors = {
  getNetworkStatus: (state) => state.data.networkStatus,
  getLoading: (state) => state.data.isLoading,
  getThemeMode: (state) => state.data.themeMode,
};

const defaultState = {
  networkStatus: true,
  isLoading: false,
  themeMode: 'light',
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
