import {_fetch} from '../config';
import {POST, GET} from 'constants';

export const getListFeaturedCategoriesService = (payload) => {
  return _fetch(POST, '/product', payload);
};
