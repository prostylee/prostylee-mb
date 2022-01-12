import {_fetch} from '../config';
import {GET, POST, PUT} from 'constants';

export const getStoreProfile = (id) => {
  return _fetch(GET, `/stores/${id}`);
};
export const getStoreStatistics = (id) => {
  return _fetch(GET, `/statistics/store/${id}`);
};
export const getStorePosts = (payload) => {
  return _fetch(GET, '/posts', payload);
};
export const getStoreBestSellerProduct = (payload) => {
  return _fetch(GET, '/products', {
    ...payload,
    bestSeller: true,
  });
};
export const getAllStoreProduct = (payload) => {
  return _fetch(GET, '/products', {
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
