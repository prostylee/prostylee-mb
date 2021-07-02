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
// LIST USER ORDER STATUS
export const getListUserOrderStatus = (payload) => {
  return _fetch(GET, '/order-status', payload);
};
//LIST ORDER BY STATUS
export const getListUserOrderByStatus = (payload) => {
  return _fetch(GET, '/orders', payload);
};
//PRODUCT LIKED API
export const getListProductLikedService = (payload) => {
  return _fetch(GET, '/user-likes', {...payload, targetType: 'PRODUCT'});
};
//PRODUCT SAVED API
export const getListProductSavedService = (payload) => {
  return _fetch(GET, '/user-wish-lists', payload);
};
// ORDER DETAILS
export const getOrderDetails = (id) => {
  return _fetch(GET, `/orders/${id}`);
};
