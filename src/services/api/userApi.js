import {_fetch} from '../config';
import {GET, PUT, POST} from 'constants';

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

export const getUserAddress = (payload) => {
  return _fetch(GET, '/user-addresses/userLogin', payload);
};

export const addUserAddress = (payload) => {
  return _fetch(POST, '/user-addresses', payload);
};

export const updateUserAddress = (payload) => {
  return _fetch(PUT, `/user-addresses/${payload.addressId}`, payload.data);
};

export const getUserPost = (payload) => {
  return _fetch(GET, '/posts', payload);
};

export const getProductsByUser = (payload) => {
  return _fetch(GET, '/products', payload);
};
