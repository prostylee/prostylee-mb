import {_fetch} from '../config';
import {GET, PUT} from 'constants';

export const getProfile = (id) => {
  return _fetch(GET, '/profile/' + id);
};

export const updateProfile = (payload) => {
  return _fetch(PUT, '/profile', payload);
};

export const getPostOfProfile = (payload) => {
  return _fetch(GET, '/posts', payload);
};

export const getStatistics = (id) => {
  return _fetch(GET, '/statistics/user-activities/' + id);
};

export const getUserPost = (payload) => {
  return _fetch(GET, '/posts', {
    params: payload,
  });
};

export const getProductsByUser = (payload) => {
  return _fetch(GET, '/products', {
    params: payload,
  });
};
