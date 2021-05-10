import {combineReducers} from 'redux';

import common, {
  actions as commonActions,
  selectors as commonSelectors,
  types as commonTypes,
} from './common';

import product, {
  actions as productActions,
  selectors as productSelectors,
  types as productTypes,
} from './product';

import user, {
  actions as userActions,
  selectors as userSelectors,
  types as userTypes,
} from './user';

import newFeed, {
  actions as newFeedActions,
  selectors as newFeedSelectors,
  types as newFeedTypes,
} from './newFeed';

import store, {actions as storeActions, types as storeTypes} from './stores';
import dynamicUsers, {
  actions as dynamicUsersActions,
  types as dynamicUsersTypes,
} from './dynamicUsers';

const rootReducer = combineReducers({
  common,
  product,
  user,
  newFeed,
  store,
  dynamicUsers,
});

export {commonActions, commonSelectors, commonTypes};
export {productActions, productSelectors, productTypes};
export {userActions, userSelectors, userTypes};
export {newFeedActions, newFeedTypes, newFeedSelectors};
export {storeActions, storeTypes};
export {dynamicUsersActions, dynamicUsersTypes};

export default rootReducer;
