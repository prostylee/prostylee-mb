import {_fetch} from '../config';
import {GET} from 'constants';

export const getPrefectureApi = (payload) => {
  return _fetch(GET, '/addresses/', payload);
};
