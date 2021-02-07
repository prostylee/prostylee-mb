import apisauce from 'apisauce';

import configEnv from 'config';
import {TIME_OUT} from 'constants';

var config = {
  url: configEnv.api_url,
  baseURL: configEnv.api_url,
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
