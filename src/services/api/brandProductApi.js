import {_fetch} from '../config';
import {GET} from 'constants';

export const getListProductApi = (payload) => {
  return _fetch(GET, '/product', {...payload, parentId: 0, sorts: '+order'});
};
