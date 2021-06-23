import {createAction, handleActions} from 'redux-actions';
import {showMessage} from 'react-native-flash-message';

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
};

export const selectors = {
  getBranchListLoading: (state) => state.branch.branchLoading,
  getBranchList: (state) => state.branch.branchList,
};

const intialState = {
  // Branches
  branchLoading: false,
  branchList: [],
  page: 0,
  hasMore: true,
  branchMoreLoading: false,
};

const PAGE_INIT = 0;
const UNIT_INCREASE = 1;
export default handleActions(
  {
    //List Cart
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
  },
  intialState,
);
