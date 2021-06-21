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

import reviewRating, {
  actions as reviewRatingActions,
  selectors as reviewRatingSelectors,
  types as reviewRatingTypes,
} from './reviewRating';

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

import address, {
  actions as addressActions,
  selectors as addressSelectors,
  types as addressTypes,
} from './address';

import branch, {actions as branchActions, types as branchTypes} from './branch';

import cart, {actions as cartActions, types as cartTypes} from './cart';
import search, {actions as searchActions, types as searchTypes} from './search';
import notification, {
  actions as notificationActions,
  types as notificationTypes,
} from './notification';

import myPage, {actions as myPageActions, types as myPageTypes} from './myPage';

import storeProfile, {
  actions as storeProfileActions,
  selectors as storeProfileSelectors,
  types as storeProfileTypes,
} from './storeProfile';

const rootReducer = combineReducers({
  common,
  product,
  user,
  newFeed,
  store,
  dynamicUsers,
  reviewRating,
  status,
  categories,
  postProduct,
  address,
  cart,
  search,
  notification,
  branch,
  myPage,
  storeProfile,
});

export {commonActions, commonSelectors, commonTypes};
export {productActions, productSelectors, productTypes};
export {userActions, userSelectors, userTypes};
export {newFeedActions, newFeedTypes, newFeedSelectors};
export {storeActions, storeTypes};
export {dynamicUsersActions, dynamicUsersTypes};
export {reviewRatingActions, reviewRatingSelectors, reviewRatingTypes};
export {statusActions, statusSelectors, statusTypes};
export {categoriesActions, categoriesTypes};
export {postProductActions, postProductSelectors, postProductTypes};
export {addressActions, addressSelectors, addressTypes};
export {cartActions, cartTypes};
export {searchActions, searchTypes};
export {notificationActions, notificationTypes};
export {branchActions, branchTypes};
export {myPageActions, myPageTypes};
export {storeProfileActions, storeProfileTypes};

export default rootReducer;
