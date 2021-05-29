import {_fetch} from '../config';
import {POST, GET} from 'constants';

export const postStatusByUser = (payload) => {
  return _fetch(POST, '/posts', payload);
};
