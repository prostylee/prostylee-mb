import {_fetch} from '../config';
import {GET} from 'constants';

export const getProfile = (payload) => {
  return _fetch(GET, '/profile', payload);
};

export const getPostOfProfile = (payload) => {
  return _fetch(GET, '/posts', payload);
};
