import Axios from 'axios';
import {config} from './Config';
import {tokenService} from './TokenService';

export const AppService = {
  getBrands,
  getBrosure
};
async function getBrands() {

  return instance.get(config.authApiUrl + '/brand/list');
}
async function getBrosure() {
  return instance.get(config.authApiUrl + '/brochure/list');
}

// Create axios client, pre-configured with baseURL
export const instance = Axios.create({
  baseURL: config.authApiUrl,
  timeout: config.requestTimeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
instance.interceptors.request.use(
  async (config) => {
    accessToken = await tokenService.get();
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
