import {combineReducers} from 'redux';

import data, {
  actions as dataActions,
  selectors as dataSelectors,
  types as dataTypes,
} from './data';

import user, {
  actions as userActions,
  selectors as userSelectors,
  types as userTypes,
} from './user';

const rootReducer = combineReducers({
  data,
  user,
});

export {dataActions, dataSelectors, dataTypes};
export {userActions, userSelectors, userTypes};

export default rootReducer;
