import {_fetch} from '../config';
import {POST, GET} from 'constants';

//PRODUCT API
export const getProducts = (payload) => {
  return _fetch(POST, '/product', payload);
};

export const getProductById = (id) => {
  return _fetch(GET, `/products/${id}`);
};
