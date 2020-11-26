import Axios from 'axios';
import {config} from './Config';
import {tokenService} from './TokenService';
import DeviceInfo from 'react-native-device-info';

export const AppService = {
  getBrands,
  getBrosure,
  createLogin,
  login,
  addtofavorites,
  getDeviceİd,
  brochureVisit,
  postFilter,
  getDetail,
};

function getDeviceİd() {
  return DeviceInfo.getUniqueId();
}
function getDetail(id) {
  return instance.post(config.authApiUrl + 'brochure/detail?brochureId=' + id);
}
async function getBrands() {
  return instance.get(config.authApiUrl + '/brand/list');
}
async function getBrosure() {
  return instance.get(config.authApiUrl + '/brochure/homepagebrochure');
}
async function brochureVisit(data) {
  return instance.post(config.authApiUrl + '/visit/brochurevisit', data);
}
async function postFilter(data) {
  return instance.post(
    config.authApiUrl + '/brochure/homepagebrochurefilter?filterKey=' + data,
    data,
  );
}
async function addtofavorites(data) {
  return instance.post(config.authApiUrl + '/favorite/addtofavorites', data);
}
async function createLogin(url) {
  console.log(url);
  const response = await instance.get(
    config.authApiUrl + '/account/create' + url,
  );
  return response;
}
async function login(url) {
  const response = await instance.get(
    config.authApiUrl + '/account/login' + url,
  );
  return response;
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
