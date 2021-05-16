import apisauce from 'apisauce';

import configEnv from 'config';

import {SUCCESS, TIME_OUT} from 'constants';
import {Auth} from 'aws-amplify';

const config = {
  url: configEnv.api_url,
  baseURL: configEnv.api_url,
  timeout: TIME_OUT,
};

export const api = apisauce.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
});

export async function _fetch(method, path, data) {
  console.log('_fetch: method=' + method + ', path=' + path + ', data=' + JSON.stringify(data));

  try {
    const token = await Auth.currentSession();
    if (token && token.accessToken) {
      api.setHeaders({
        Authorization: 'Bearer ' + token.accessToken.jwtToken,
        'X-PS-Authorization-Type': 'OPEN-ID',
      });
    }
  } catch (e) {
    console.log(e);
  }

  return api[method](path, data).then((res) => {
    // console.log('_fetch response=' + JSON.stringify(res));
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
