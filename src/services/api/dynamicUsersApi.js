import {_fetch} from '../config';
import {GET} from 'constants';

export const getDynamicUsers = (payload) => {
  return _fetch(GET, '/user-activities/most-actives', payload);
};
