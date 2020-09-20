import {instance} from './AppService';
import { AsyncStorage } from 'react-native';


let token;
export const tokenService = {
  get,
  set,
};
async function get() {
  console.log(token);
  if (token) return token;
  token = await AsyncStorage.getItem('userToken');
  return token;
}
async function set(value) {
  token = value;
}
