import {SET_TOKEN} from '../constants/action-types';

export default function setToken(payload) {
  return {type: SET_TOKEN, payload};
}
