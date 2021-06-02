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
  return _fetch(GET, '/shippings/providers-fee', {...payload});
};

export const orders = (payload) => {
  return _fetch(POST, '/orders', payload);
};
