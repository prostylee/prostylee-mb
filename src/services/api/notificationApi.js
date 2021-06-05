import {_fetch} from '../config';
import {POST, GET, PUT, DELETE} from 'constants';

export const countNotification = (payload) => {
  return _fetch(GET, '/notifications/count', payload);
};

export const getListNotificationService = (payload) => {
  return _fetch(GET, '/notifications', {
    sorts: 'createdAt',
    ...payload,
  });
};

export const markReadAll = (payload) => {
  return _fetch(PUT, '/notifications', payload);
};

export const deleteNotificationService = (id) => {
  return _fetch(DELETE, `/notifications/${id}`);
};

export const deleteAllNotification = () => {
  return _fetch(DELETE, `/notifications`);
};

export const maskReadNotification = (id) => {
  return _fetch(PUT, `/notifications/${id}`);
};

export const getListNotificationDiscountService = (payload) => {
  return _fetch(GET, '/notifications/discounts', {
    sorts: 'createdAt',
    ...payload,
  });
};
