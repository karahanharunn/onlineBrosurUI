import {AsyncStorage} from 'react-native';
import Axios from 'axios';
import {config} from './Config';

export const AppService = {
  getBrands,
};
async function getBrands() {
  return instance.get('/brand/list');
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
  (config) => {
    accessToken = AsyncStorage.getItem('userToken');
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
const getToken = () => {};
