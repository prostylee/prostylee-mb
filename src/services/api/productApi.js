import {_fetch} from '../config';
import {POST, GET, PUT, DELETE} from 'constants';

//PRODUCT API
export const getProducts = (payload) => {
  return _fetch(POST, '/product', payload);
};
