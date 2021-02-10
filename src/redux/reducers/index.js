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
  types as newFeedTypes,
} from './newFeed';

import store, {
  actions as storeActions,
  types as storeTypes,
} from './stores';

const rootReducer = combineReducers({
  common,
  product,
  user,
  newFeed,
  store,
});

export {commonActions, commonSelectors, commonTypes};
export {productActions, productSelectors, productTypes};
export {userActions, userSelectors, userTypes};
export {newFeedActions, newFeedTypes};
export {storeActions, storeTypes};

export default rootReducer;
