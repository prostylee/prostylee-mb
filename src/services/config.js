import apisauce from 'apisauce';

import {api_url} from 'config';
import {TIME_OUT} from 'constants';

var config = {
  url: api_url,
  baseURL: api_url,
  timeout: TIME_OUT,
};

export const api = apisauce.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
});

export async function _fetch(method, path, data) {
  return api[method](path, data).then((res) => {
    return {ok: true, data: res.data};
  });
}

export const setHeadersRequest = async (headers) => {
  api.setHeaders(headers);
};
