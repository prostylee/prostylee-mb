import {_fetch} from '../config';
import {GET} from 'constants';

export const getNewFeed = (payload) => {
  return _fetch(GET, '/products/new-feeds', payload);
};

export const getStoriesByStore = (payload) => {
  return _fetch(GET, '/stories/store', payload);
};

export const getStoriesByUser = (payload) => {
  return _fetch(GET, 'stories/user', payload);
};
