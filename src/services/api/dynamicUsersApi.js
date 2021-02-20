import {_fetch, api} from '../config';
import {POST, GET, PUT, DELETE} from 'constants';

export const getDynamicUsers = (payload) => {
  return _fetch(GET, '/user-activities/most-actives', payload);
};
