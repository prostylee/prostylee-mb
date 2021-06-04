import {_fetch} from '../config';
import {GET} from 'constants';

export const getTopStore = (payload) => {
  return _fetch(GET, '/stores/top/products', payload);
};

export const getStoreById = (id) => {
  return _fetch(GET, `/stores/${id}`);
};

export const getStoreMiniApi = () => {
  return _fetch(GET, '/stores/mini-stores', {});
};
// STORE MAIN
export const getBannerGroups = (payload) => {
  return _fetch(GET, '/ads-groups', {...payload});
};
export const getBannerImageByGroupId = (payload) => {
  return _fetch(GET, '/ads-banners', {
    ...payload,
  });
};
export const getBrandList = (payload) => {
  return _fetch(GET, '/brands', {
    ...payload,
  });
};
export const getCategories = (payload) => {
  return _fetch(GET, '/categories', {...payload});
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
  return _fetch(GET, '/products', {userId: 1, ...payload});
};

//BEST SELLER
export const getBestSellers = (payload) => {
  return _fetch(GET, '/products/best-seller', {
    ...payload,
  });
};

//VOUCHERS
export const getVouchers = (payload) => {
  return _fetch(GET, '/voucher/userLogin', {...payload});
};
