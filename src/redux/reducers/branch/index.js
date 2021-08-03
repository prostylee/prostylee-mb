import {createAction, handleActions} from 'redux-actions';
import RootNavigator from 'navigator/rootNavigator';
import {showMessage} from 'react-native-flash-message';
import i18n from 'i18n';

export const types = {
  // Branches
  GET_BRANCH_LOADING: 'GET_BRANCH_LOADING',
  GET_BRANCH: 'GET_BRANCH',
  GET_BRANCH_SUCCESS: 'GET_BRANCH_SUCCESS',
  GET_BRANCH_FAILED: 'GET_BRANCH_FAILED',

  GET_BRANCH_MORE_LOADING: 'GET_BRANCH_MORE_LOADING',
  GET_BRANCH_MORE: 'GET_BRANCH_MORE',
  GET_BRANCH_MORE_SUCCESS: 'GET_BRANCH_MORE_SUCCESS',
  GET_BRANCH_MORE_FAILED: 'GET_BRANCH_MORE_FAILED',

  GET_BRANCH_CITY_LOADING: 'GET_BRANCH_CITY_LOADING',
  GET_BRANCH_CITY: 'GET_BRANCH_CITY',
  GET_BRANCH_CITY_SUCCESS: 'GET_BRANCH_CITY_SUCCESS',
  GET_BRANCH_CITY_FAILED: 'GET_BRANCH_CITY_FAILED',

  GET_ORDER_AT_BRANCH_LOADING: 'GET_ORDER_AT_BRANCH_LOADING',
  GET_ORDER_AT_BRANCH: 'GET_ORDER_AT_BRANCH',
  GET_ORDER_AT_BRANCH_SUCCESS: 'GET_ORDER_AT_BRANCH_SUCCESS',
  GET_ORDER_AT_BRANCH_FAILED: 'GET_ORDER_AT_BRANCH_FAILED',
};

export const actions = {
  // Branches
  setBranchLoading: createAction(types.GET_BRANCH_LOADING),
  getBranch: createAction(types.GET_BRANCH),
  getBranchSuccess: createAction(types.GET_BRANCH_SUCCESS),
  getBranchFailed: createAction(types.GET_BRANCH_FAILED),

  // Load more
  setBranchMoreLoading: createAction(types.GET_BRANCH_LOADING),
  getBrancMore: createAction(types.GET_BRANCH),
  getBranchMoreSuccess: createAction(types.GET_BRANCH_SUCCESS),
  getBranchMoreFailed: createAction(types.GET_BRANCH_FAILED),

  // Branches City
  setBranchCityLoading: createAction(types.GET_BRANCH_CITY_LOADING),
  getBranchCity: createAction(types.GET_BRANCH_CITY),
  getBranchCitySuccess: createAction(types.GET_BRANCH_CITY_SUCCESS),
  getBranchCityFailed: createAction(types.GET_BRANCH_CITY_FAILED),

  // OrderAtBranch
  setOrderAtBranchLoading: createAction(types.GET_ORDER_AT_BRANCH_LOADING),
  getOrderAtBranch: createAction(types.GET_ORDER_AT_BRANCH),
  getOrderAtBranchSuccess: createAction(types.GET_ORDER_AT_BRANCH_SUCCESS),
  getOrderAtBranchFailed: createAction(types.GET_ORDER_AT_BRANCH_FAILED),
};

export const selectors = {
  getBranchListLoading: (state) => state.branch.branchLoading,
  getBranchList: (state) => state.branch.branchList,
  getBranchCityListLoading: (state) => state.branch.branchCityListLoading,
  getBranchCityList: (state) => state.branch.branchCityList,
  getOrderAtBranchLoading: (state) => state.branch.orderAtbranchLoading,
};

const intialState = {
  // Branches
  orderAtbranchLoading: false,
  branchLoading: false,
  branchCityListLoading: false,
  branchList: [],
  branchCityList: [],
  page: 0,
  hasMore: true,
  branchMoreLoading: false,
};

const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export default handleActions(
  {
    //List Branch
    [types.GET_BRANCH_LOADING]: (state, {payload}) => {
      return {...state, branchLoading: payload};
    },
    [types.GET_BRANCH_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        branchList: payload,
      };
    },
    [types.GET_BRANCH_FAILED]: (state, {payload}) => {
      return {
        ...state,
        branchList: [],
      };
    },
    //List Branch City
    [types.GET_BRANCH_CITY_LOADING]: (state, {payload}) => {
      return {...state, branchCityListLoading: payload};
    },
    [types.GET_BRANCH_CITY_SUCCESS]: (state, {payload}) => {
      return {
        ...state,
        branchCityList: payload,
      };
    },
    [types.GET_BRANCH_CITY_FAILED]: (state, {payload}) => {
      return {
        ...state,
        branchCityList: [],
      };
    },
    [types.GET_ORDER_AT_BRANCH_LOADING]: (state, {payload}) => {
      return {
        ...state,
        orderAtbranchLoading: payload,
      };
    },
    [types.GET_ORDER_AT_BRANCH_SUCCESS]: (state, {payload}) => {
      RootNavigator.goBack();
      return {...state};
    },
    [types.GET_ORDER_AT_BRANCH_FAILED]: (state, {payload}) => {
      showMessage({
        message: i18n.t('storeAddress.cannotSendRequest'),
        type: 'danger',
        position: 'top',
      });
      return {...state};
    },
  },
  intialState,
);
