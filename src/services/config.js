import apisauce from 'apisauce';

import configEnv from 'config';

import {SUCCESS, TIME_OUT} from 'constants';
import {Auth} from 'aws-amplify';
import {showMessage} from 'react-native-flash-message';

import i18n from 'i18n';

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
  console.log(
    'baseURL=' + config.baseURL,
    '_fetch: method=' +
      method +
      ', path=' +
      path +
      ', data=' +
      JSON.stringify(data),
  );

  try {
    const token = await Auth.currentSession();
    // console.log('jwtToken===' + token.idToken.jwtToken);
    if (token && token.accessToken) {
      api.setHeaders({
        Authorization: 'Bearer ' + token.idToken.jwtToken,
        'X-PS-Authorization-Type': 'OPEN-ID',
      });
    }
  } catch (e) {
    console.log('aws _fetch error', e);
    // showMessage({
    //   message: i18n.t('unknownMessage'),
    //   type: 'danger',
    //   position: 'top',
    // });
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
        error: res?.data?.message || res?.data?.error,
        data: null,
      };
      return {ok: true, data: response};
    }
  });
}
