import {all} from 'redux-saga/effects';

import product from './product';
import user from './user';
import newFeed from './newFeed';
import stores from './stores'

export default function* rootSaga() {
  yield all([...product, ...user, ...newFeed, ...stores]);
}
