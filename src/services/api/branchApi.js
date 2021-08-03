import {_fetch} from '../config';
import {GET} from 'constants';

export const getBranchApi = (payload) => {
  return _fetch(GET, '/branches', payload);
};

export const getBranchCityApi = (payload) => {
  return _fetch(GET, `/branches/cities/${payload.id}`, payload);
};
