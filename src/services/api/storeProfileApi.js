import {_fetch} from '../config';
import {GET, POST, PUT} from 'constants';

export const getStoreProfile = (id) => {
  return _fetch(GET, `/stores/${id}`);
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
