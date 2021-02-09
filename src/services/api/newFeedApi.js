import {_fetch, api} from '../config';
import {POST, GET, PUT, DELETE} from 'constants';

export const getNewFeed = (payload) => {
  return _fetch(GET, '/products/new-feeds', payload);
};
