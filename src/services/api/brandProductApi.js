import {_fetch} from '../config';
import {GET} from 'constants';

export const getListProductApi = (payload) => {
  return _fetch(GET, '/products', {...payload});
};
