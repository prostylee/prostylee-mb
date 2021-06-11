import {_fetch} from '../config';
import {POST, GET, PUT} from 'constants';

// POST PRODUCT API
export const getListAttributesByCategoryId = (payload) => {
  return _fetch(GET, `/categories/${payload.id ? payload.id : 1}/attributes`);
};
export const getListProductStatus = () => {
  return _fetch(GET, `/used-statuses`);
};

export const getListPaymentMethod = (payload) => {
  return _fetch(GET, `/payments`, {
    page: 0,
    limit: 0,
  });
};
export const getListDeliveryType = () => {
  return _fetch(GET, `/shippings/methods`);
};

export const getListLocation = (payload) => {
  return _fetch(GET, `/user-addresses/userLogin`, {...payload});
};
