import {call, put, takeLatest} from 'redux-saga/effects';

import {
  getStoreResultsApi,
  getStoreBestSellerProduct,
} from 'services/api/searchApi';

import {searchActions, searchTypes} from 'reducers';

import {SUCCESS} from 'constants';

//List FEATURED_PRODUCT_SEARCH

const getStoreSearch = function* ({payload}) {
  try {
    yield put(searchActions.setStoreSearchLoading(true));
    const res = yield call(getStoreResultsApi, payload);
    let listStore = res?.data?.data?.content;
    // const newData = yield call(getStoreBestSellerProductByStoreId, listStore);

    if (res.ok && res.data.status === SUCCESS && !res.data.error) {
      yield put(searchActions.getStoreSearchSuccess(listStore));
    } else {
      yield put(searchActions.getStoreSearchFailed());
    }
  } catch (e) {
    console.error(e);
  } finally {
    yield put(searchActions.setStoreSearchLoading(false));
  }
};
const getStoreBestSellerProductByStoreId = async (listStore = []) => {
  let newListStore = [];
  if (listStore && listStore.length) {
    for await (let item of listStore) {
      let {data} = await getStoreBestSellerProduct({
        storeId: item?.id,
        page: 0,
        limit: 30,
      });
      newListStore.push({
        ...item,
        products: data?.data?.content?.map((v) => ({
          name: v.name,
          id: v?.id,
          imgUrl: v?.imageUrls?.[0] ? v?.imageUrls?.[0] : '',
        })),
      });
    }
  }
  return newListStore;
};

const watcher = function* () {
  //List FEATURED_PRODUCT_SEARCH
  yield takeLatest(searchTypes.GET_STORE_SEARCH, getStoreSearch);
};
export default watcher();
