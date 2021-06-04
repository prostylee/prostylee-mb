import {createAction, handleActions} from 'redux-actions';

export const types = {
  UPDATE_NETWORK_STATUS: 'UPDATE_NETWORK_STATUS',
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  TOGGLE_THEME_MODE: 'TOGGLE_THEME_MODE',
  TOGGLE_TARGET_TYPE: 'TOGGLE_TARGET_TYPE',
  TOGGLE_VIEW_MODE: 'TOGGLE_VIEW_MODE',
  SHOW_ONBOARDING_SCREEN: 'SHOW_ONBOARDING_SCREEN',
  SET_INITIAL_ROUTE_NAME: 'SET_INITIAL_ROUTE_NAME',
  TOGGLE_FOCUS_MAIN_TAB: 'TOGGLE_FOCUS_MAIN_TAB',
  TOGGLE_TAB_BUTTON: 'TOGGLE_TAB_BUTTON',
  TOGGLE_ADD_PICTURE_OPTION: 'TOGGLE_ADD_PICTURE_OPTION',
};

export const actions = {
  updateNetworkStatus: createAction(types.UPDATE_NETWORK_STATUS),
  toggleLoading: createAction(types.TOGGLE_LOADING),
  toggleThemeMode: createAction(types.TOGGLE_THEME_MODE),
  toggleTargetType: createAction(types.TOGGLE_TARGET_TYPE),
  toggleViewMode: createAction(types.TOGGLE_VIEW_MODE),
  showOnboardingScreen: createAction(types.SHOW_ONBOARDING_SCREEN),
  setInitialRouteName: createAction(types.SET_INITIAL_ROUTE_NAME),
  toggleFocusMainTab: createAction(types.TOGGLE_FOCUS_MAIN_TAB),
  toggleTabButton: createAction(types.TOGGLE_TAB_BUTTON),
  toggleAddPictureOption: createAction(types.TOGGLE_ADD_PICTURE_OPTION),
};

export const selectors = {
  getNetworkStatus: (state) => state.common.networkStatus,
  getLoading: (state) => state.common.isLoading,
  getThemeMode: (state) => state.common.themeMode,
  showOnboardingScreen: (state) => state.common.isShowOnboardingScreen,
  getInitialRouteName: (state) => state.common.initialRouteName,
  isFocusedMainTab: (state) => state.common.isFocusedMainTab,
  isShowTabButton: (state) => state.common.isShowTabButton,
  isShowAddPictureOption: (state) => state.common.isShowAddPictureOption,
};

const intialState = {
  networkStatus: true,
  isLoading: false,
  isFocusedMainTab: false,
  isShowOnboardingScreen: true,
  themeMode: 'light',
  targetType: 'STORE',
  initialRouteName: 'Welcome',
  isFullView: false,
  isShowTabButton: false,
  isShowAddPictureOption: false,
};

export default handleActions(
  {
    [types.TOGGLE_FOCUS_MAIN_TAB]: (state, {payload}) => {
      return {...state, isFocusedMainTab: payload};
    },
    [types.UPDATE_NETWORK_STATUS]: (state, {payload}) => {
      return {...state, networkStatus: payload};
    },
    [types.TOGGLE_LOADING]: (state, {payload}) => {
      return {...state, isLoading: payload};
    },
    [types.TOGGLE_TARGET_TYPE]: (state, {payload}) => {
      return {...state, targetType: payload};
    },
    [types.SHOW_ONBOARDING_SCREEN]: (state, {payload}) => {
      return {...state, isShowOnboardingScreen: payload};
    },
    [types.SET_INITIAL_ROUTE_NAME]: (state, {payload}) => {
      return {...state, initialRouteName: payload};
    },
    [types.TOGGLE_VIEW_MODE]: (state, {payload}) => {
      return {...state, isFullView: payload};
    },
    [types.TOGGLE_TAB_BUTTON]: (state, {payload}) => {
      return {...state, isShowTabButton: payload};
    },
    [types.TOGGLE_ADD_PICTURE_OPTION]: (state, {payload}) => {
      return {...state, isShowAddPictureOption: payload};
    },
  },
  intialState,
);
