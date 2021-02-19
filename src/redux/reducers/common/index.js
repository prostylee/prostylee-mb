import {createAction, handleActions} from 'redux-actions';

export const types = {
  UPDATE_NETWORK_STATUS: 'UPDATE_NETWORK_STATUS',
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  TOGGLE_THEME_MODE: 'TOGGLE_THEME_MODE',
  TOGGLE_TARGET_TYPE: 'TOGGLE_TARGET_TYPE',
};

export const actions = {
  updateNetworkStatus: createAction(types.UPDATE_NETWORK_STATUS),
  toggleLoading: createAction(types.TOGGLE_LOADING),
  toggleThemeMode: createAction(types.TOGGLE_THEME_MODE),
  toggleTargetType: createAction(types.TOGGLE_TARGET_TYPE),
};

export const selectors = {
  getNetworkStatus: (state) => state.common.networkStatus,
  getLoading: (state) => state.common.isLoading,
  getThemeMode: (state) => state.common.themeMode,
};

const intialState = {
  networkStatus: true,
  isLoading: false,
  themeMode: 'light',
  targetType: 'STORE',
};

export default handleActions(
  {
    [types.UPDATE_NETWORK_STATUS]: (state, {payload}) => {
      return {...state, networkStatus: payload};
    },
    [types.TOGGLE_LOADING]: (state, {payload}) => {
      return {...state, isLoading: payload};
    },
    [types.TOGGLE_TARGET_TYPE]: (state, {payload}) => {
      return {...state, targetType: payload};
    },
  },
  intialState,
);
