import {handleActions} from 'redux-actions';
import {
  types as typesListNotification,
  actions as actionsListNotification,
  defaultState as defaultStateListNotification,
  handleActions as handleActionsListNotification,
} from './listNotification';

export const types = {
  //List LIST_NOTIFICATION
  ...typesListNotification,
};

export const actions = {
  //List LIST_NOTIFICATION
  ...actionsListNotification,
};

const defaultState = {
  //List LIST_NOTIFICATION
  ...defaultStateListNotification,
};

export default handleActions(
  {
    //List LIST_NOTIFICATION
    ...handleActionsListNotification,
  },
  defaultState,
);
