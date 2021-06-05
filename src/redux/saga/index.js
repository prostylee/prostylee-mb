import {all} from 'redux-saga/effects';

import product from './product';
import user from './user';
import newFeed from './newFeed';
import stores from './stores';
import daynamicUsers from './dynamicUsers';
import reviewRating from './reviewRating';
import status from './status';
import categories from './categories';
import cart from './cart';

import search from './search';
import topSearch from './search/topSearch';
import hintProductSearch from './search/hintProductSearch';
import featuredProductSearch from './search/featuredProductSearch';
import storeSearch from './search/storeSearch';
import productSearchMain from './search/productSearchMain';
import productFilter from './search/productFilter';
import listNotification from './notification';
import storeMain from './stores/storeMain';

export default function* rootSaga() {
  yield all([
    ...product,
    ...user,
    ...newFeed,
    ...stores,
    ...daynamicUsers,
    ...reviewRating,
    ...status,
    ...categories,
    ...cart,
    ...search,
    ...topSearch,
    ...hintProductSearch,
    ...featuredProductSearch,
    ...storeSearch,
    ...productSearchMain,
    ...productFilter,
    ...listNotification,
    ...storeMain,
  ]);
}
