import {_fetch} from '../config';
import {POST} from 'constants';

//PRODUCT API
export const getProducts = (payload) => {
  return _fetch(POST, '/product', payload);
};
