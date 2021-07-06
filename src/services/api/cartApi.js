import {_fetch} from '../config';
import {GET, POST} from 'constants';

export const getRecentViewList = (payload) => {
  return _fetch(GET, '/products/recent-view', {...payload, page: 0, limit: 10});
};

export const getSuggestionsList = (payload) => {
  return _fetch(GET, '/products/suggestions', {...payload, page: 0, limit: 10});
};

export const getPaymentMethods = (payload) => {
  return _fetch(GET, '/payments', {...payload});
};

export const getDeliveryMethods = (payload) => {
  return _fetch(GET, '/shippings/providers-fee/providers-fee', {...payload});
};

export const createOrders = (payload) => {
  return _fetch(POST, '/orders', payload);
};

export const getUserAddress = (payload) => {
  return _fetch(GET, '/user-addresses/userLogin', {
    ...payload,
  });
};

export const getVoucherList = (payload) => {
  return _fetch(GET, '/user-vouchers', {
    ...payload,
    savedByMe: true,
    page: 0,
    limit: 10,
  });
};

export const verifyVoucher = (payload) => {
  return _fetch(POST, `user-vouchers/${payload.voucherId}/verify`, payload);
};

export const checkVoucher = (payload) => {
  return _fetch(POST, '/orders/checkVoucher', payload);
};
