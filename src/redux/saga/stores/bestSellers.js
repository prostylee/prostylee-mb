import {call, put, takeLatest} from 'redux-saga/effects';

import {getBestSellers as getBestSellersApi} from 'services/api/storeApi';

import {storeActions, storeTypes} from 'reducers';

import {SUCCESS} from 'constants';

const getBestSellers = function* ({payload}) {
  try {
    yield put(storeActions.setBestSellersLoading(true));
    const res = yield call(getBestSellersApi, payload);

    console.log('GET BEST SELLER', res);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getBestSellersSuccess(res?.data?.data));
    } else {
      yield put(storeActions.getBestSellersFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(storeActions.setBestSellersLoading(false));
  }
};
const getBestSellersLoadmore = function* ({payload}) {
  try {
    yield put(storeActions.setBestSellersLoadmoreLoading(true));
    const res = yield call(getBestSellersApi, payload);
    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(storeActions.getBestSellersLoadmoreSuccess(res?.data?.data));
    } else {
      yield put(storeActions.getBestSellersLoadmoreFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(storeActions.setNearbyStoreLoadmoreLoading(false));
  }
};

const watcher = function* () {
  yield takeLatest(storeTypes.GET_BEST_SELLERS, getBestSellers);
  yield takeLatest(
    storeTypes.GET_BEST_SELLERS_LOADMORE,
    getBestSellersLoadmore,
  );
};
export default watcher();
