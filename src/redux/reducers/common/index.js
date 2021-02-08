import {createAction, handleActions} from 'redux-actions';

export const types = {
  UPDATE_NETWORK_STATUS: 'UPDATE_NETWORK_STATUS',
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  TOGGLE_THEME_MODE: 'TOGGLE_THEME_MODE',
  SHOW_ONBOARDING_SCREEN: 'SHOW_ONBOARDING_SCREEN',
  SET_INITIAL_ROUTE_NAME: 'SET_INITIAL_ROUTE_NAME',
};

export const actions = {
  updateNetworkStatus: createAction(types.UPDATE_NETWORK_STATUS),
  toggleLoading: createAction(types.TOGGLE_LOADING),
  toggleThemeMode: createAction(types.TOGGLE_THEME_MODE),
  showOnboardingScreen: createAction(types.SHOW_ONBOARDING_SCREEN),
  setInitialRouteName: createAction(types.SET_INITIAL_ROUTE_NAME),
};

export const selectors = {
  getNetworkStatus: (state) => state.common.networkStatus,
  getLoading: (state) => state.common.isLoading,
  getThemeMode: (state) => state.common.themeMode,
  showOnboardingScreen: (state) => state.common.isShowOnboardingScreen,
  getInitialRouteName: (state) => state.common.initialRouteName,
};

const defaultState = {
  networkStatus: true,
  isLoading: false,
  isShowOnboardingScreen: true,
  themeMode: 'light',
  initialRouteName: 'Welcome',
};

export default handleActions(
  {
    [types.UPDATE_NETWORK_STATUS]: (state, {payload}) => {
      return {...state, networkStatus: payload};
    },
    [types.TOGGLE_LOADING]: (state, {payload}) => {
      return {...state, isLoading: payload};
    },
    [types.SHOW_ONBOARDING_SCREEN]: (state, {payload}) => {
      return {...state, isShowOnboardingScreen: payload};
    },
    [types.SET_INITIAL_ROUTE_NAME]: (state, {payload}) => {
      return {...state, initialRouteName: payload};
    },
  },
  defaultState,
);
