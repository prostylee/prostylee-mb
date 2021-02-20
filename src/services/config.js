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

api.setHeader('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJpZFwiOjIwLFwiZnVsbE5hbWVcIjpcIlN1cGVyIEFkbWluXCIsXCJ1c2VybmFtZVwiOlwic3VwZXJhZG1pbjFAZ21haWwuY29tXCIsXCJwaG9uZU51bWJlclwiOlwiMDkwMDAwMDAwM1wiLFwiZ2VuZGVyXCI6XCJNXCIsXCJyb2xlc1wiOltcIlNVUEVSX0FETUlOXCJdLFwiZmVhdHVyZXNcIjpbXX0iLCJzY29wZXMiOlsiUk9MRV9TVVBFUl9BRE1JTiJdLCJpc3MiOiJodHRwczovL3Byb3N0eWxlZS52bi8iLCJpYXQiOjE2MTM4MDcyNTUsImV4cCI6MTYxMzgyMTY1NX0.vGYg7feNfvL7N48X1GKmPaFuC4IVV-mf5shHC9YcapyZEsVr6nutQn_uxmpSaOvirFWRci9U5OOhcknbeR-pOg')

export async function _fetch(method, path, data) {
  return api[method](path, data).then((res) => {
    return {ok: true, data: res.data};
  });
}

export const setHeadersRequest = async (headers) => {
  api.setHeaders(headers);
};
