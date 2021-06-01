import {all} from 'redux-saga/effects';

import product from './product';
import user from './user';
import newFeed from './newFeed';
import stores from './stores';
import daynamicUsers from './dynamicUsers';
import status from './status';
import categories from './categories';
import search from './search';
import topSearch from './search/topSearch';
import hintProductSearch from './search/hintProductSearch';
import featuredProductSearch from './search/featuredProductSearch';
import storeSearch from './search/storeSearch';

export default function* rootSaga() {
  yield all([
    ...product,
    ...user,
    ...newFeed,
    ...stores,
    ...daynamicUsers,
    ...status,
    ...categories,
    ...search,
    ...topSearch,
    ...hintProductSearch,
    ...featuredProductSearch,
    ...storeSearch,
  ]);
}
