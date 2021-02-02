import {all} from 'redux-saga/effects';

import data from './data';
import user from './user';

export default function* rootSaga() {
  yield all([...data, ...user]);
}
