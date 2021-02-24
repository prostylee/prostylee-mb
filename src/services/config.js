import apisauce from 'apisauce';

import configEnv from 'config';

import {TIME_OUT, SUCCESS} from 'constants';

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
    let response;
    if (res && res.status === SUCCESS) {
      response = {
        status: res.status,
        error: null,
        data: res.data,
      };
      return {ok: true, data: response};
    } else if (res && res.status !== SUCCESS) {
      response = {
        status: res.status,
        error: res.data.message,
        data: null,
      };
      return {ok: true, data: response};
    }
  });
}

export const setHeadersRequest = async (headers) => {
  api.setHeaders(headers);
};
