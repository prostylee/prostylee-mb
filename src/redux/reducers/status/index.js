import {createAction, handleActions} from 'redux-actions';

export const types = {
  ADD_STATUS_STORE: 'ADD_STATUS_STORE',
  REMOVE_STATUS_STORE: 'REMOVE_STATUS_STORE',

  POST_STATUS: 'POST_STATUS',
  POST_STATUS_SUCCESS: 'POST_STATUS_SUCCESS',
  POST_STATUS_FAIL: 'POST_STATUS_FAIL',
};

export const actions = {
  addStatusStore: createAction(types.ADD_STATUS_STORE),
  removeStatusStore: createAction(types.REMOVE_STATUS_STORE),

  postStatus: createAction(types.POST_STATUS),
  postStatusSuccess: createAction(types.POST_STATUS_SUCCESS),
  postStatusFail: createAction(types.POST_STATUS_FAIL),
};

export const selectors = {
  getStatusStore: (state) => state.status.statusStoreSelect,
};

const defaultState = {
  statusStoreSelect: {},
};

export default handleActions(
  {
    [types.ADD_STATUS_STORE]: (state, {payload}) => {
      return {...state, statusStoreSelect: payload};
    },
    [types.REMOVE_STATUS_STORE]: (state, {payload}) => {
      return {...state, statusStoreSelect: {}};
    },
  },
  defaultState,
);
