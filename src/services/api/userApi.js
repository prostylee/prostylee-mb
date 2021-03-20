import {_fetch} from '../config';
import {GET} from 'constants';

export const getProfile = (id) => {
  return _fetch(GET, '/profile/' + id);
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
