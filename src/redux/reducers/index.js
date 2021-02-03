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

const rootReducer = combineReducers({
  common,
  product,
  user,
});

export {commonActions, commonSelectors, commonTypes};
export {productActions, productSelectors, productTypes};
export {userActions, userSelectors, userTypes};

export default rootReducer;
