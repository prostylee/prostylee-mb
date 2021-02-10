import {_fetch, api} from '../config';
import {POST, GET, PUT, DELETE} from 'constants';

export const getTopStore = (payload) => {
  return _fetch(GET, '/stores/top/products', payload);
};
