import {_fetch} from '../config';
import {GET} from 'constants';

export const getTopStore = (payload) => {
  return _fetch(GET, '/stores/top/products', payload);
};
