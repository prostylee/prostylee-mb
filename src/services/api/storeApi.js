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
