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

import status, {
  actions as statusActions,
  selectors as statusSelectors,
  types as statusTypes,
} from './status';
import categories, {
  actions as categoriesActions,
  types as categoriesTypes,
} from './categories';

import postProduct, {
  actions as postProductActions,
  selectors as postProductSelectors,
  types as postProductTypes,
} from './postProduct';

const rootReducer = combineReducers({
  common,
  product,
  user,
  newFeed,
  store,
  dynamicUsers,
  status,
  categories,
  postProduct,
});

export {commonActions, commonSelectors, commonTypes};
export {productActions, productSelectors, productTypes};
export {userActions, userSelectors, userTypes};
export {newFeedActions, newFeedTypes, newFeedSelectors};
export {storeActions, storeTypes};
export {dynamicUsersActions, dynamicUsersTypes};
export {statusActions, statusSelectors, statusTypes};
export {categoriesActions, categoriesTypes};
export {postProductActions, postProductSelectors, postProductTypes};

export default rootReducer;
