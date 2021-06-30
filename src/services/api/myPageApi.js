import {_fetch} from '../config';
import {POST, GET, PUT, DELETE} from 'constants';

//PRODUCT SALE API
export const getListProductSaleService = (payload) => {
  return _fetch(GET, '/products', payload);
};

//PRODUCT SOLD API
export const getListProductSoldService = (payload) => {
  return _fetch(GET, '/products', payload);
};
//LIST USER POST
export const getListUserPostService = (payload) => {
  return _fetch(GET, '/posts', payload);
};
