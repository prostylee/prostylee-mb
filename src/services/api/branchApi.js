import {_fetch} from '../config';
import {GET, POST} from 'constants';

export const getBranchApi = (payload) => {
  return _fetch(GET, '/branches', payload);
};

export const getBranchCityApi = (payload) => {
  return _fetch(GET, `/branches/cities/${payload.id}`, payload);
};

export const orderAtStoreApi = (payload) => {
  return _fetch(POST, '/orders/orderAtStore', payload);
};
