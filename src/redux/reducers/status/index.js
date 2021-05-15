import {createAction, handleActions} from 'redux-actions';

export const types = {
  ADD_STATUS_STORE: 'ADD_STATUS_STORE',
  REMOVE_STATUS_STORE: 'REMOVE_STATUS_STORE',
};

export const actions = {
  addStatusStore: createAction(types.ADD_STATUS_STORE),
  removeStatusStore: createAction(types.REMOVE_STATUS_STORE),
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
