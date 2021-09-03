import {_fetch} from '../config';
import {GET, POST, PUT, DELETE} from 'constants';

export const getTopStore = (payload) => {
  return _fetch(GET, '/stores/top/products', payload);
};

export const getStoreById = (id) => {
  return _fetch(GET, `/stores/${id}`);
};

export const getStoreMiniApi = (payload) => {
  return _fetch(GET, '/stores/mini-stores', payload);
};
// STORE MAIN
export const getBannerGroups = (payload) => {
  return _fetch(GET, '/ads-groups', {...payload});
};
export const getBannerAds = (payload) => {
  return _fetch(GET, '/ads-banners', {
    ...payload,
  });
};
export const getBannerCampaigns = (payload) => {
  return _fetch(GET, '/ads-campaigns', {
    ...payload,
  });
};

export const getBrandList = (payload) => {
  return _fetch(GET, '/brands', {
    ...payload,
    hotBrand: 'TRUE',
  });
};
export const getCategories = (payload) => {
  return _fetch(GET, '/categories', {...payload});
};

export const getHighlightStoreList = (payload) => {
  return _fetch(GET, '/stores/top/products', {
    numberOfProducts: 3,
    timeRangeInDays: 100,
    ...payload,
  });
};

//NEARBY STORE
export const getNearbyStore = (payload) => {
  return _fetch(GET, '/stores', {
    latitude: 10.806406363857086,
    longtitude: 106.6634168400805,
    numberOfProducts: 10,
    ...payload,
  });
};

//PERSONAL SALERS
export const getPersonalSalersProducts = (payload) => {
  return _fetch(GET, '/products', {
    ...payload,
    newFeedType: 'USER',
  });
};

export const followStoreService = (id) => {
  return _fetch(POST, '/user-followers/follow', {
    targetId: id,
    targetType: 'STORE',
    customFieldId1: 0,
    customFieldId2: 0,
    customFieldId3: 0,
  });
};

export const unFollowStoreService = (id) => {
  return _fetch(PUT, '/user-followers/unfollow', {
    targetId: id,
    targetType: 'STORE',
    customFieldId1: 0,
    customFieldId2: 0,
    customFieldId3: 0,
  });
};
//BEST SELLER
export const getBestSellers = (payload) => {
  return _fetch(GET, '/products/best-seller', {
    ...payload,
  });
};

//VOUCHERS
export const getVouchers = (payload) => {
  return _fetch(GET, '/user-vouchers', {...payload});
};

export const postSaveVouchers = (id) => {
  return _fetch(POST, `/user-vouchers/${id}`);
};

export const postUnSaveVouchers = (id) => {
  return _fetch(DELETE, `/user-vouchers/${id}`);
};

// BOTTOM TAB LIST
export const getBottomTabList = (payload) => {
  return _fetch(GET, '/products/allTabs', {...payload});
};
