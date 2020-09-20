import {SET_TOKEN} from '../constants/action-types';
import {AsyncStorage} from 'react-native';

const initialState = {
  title: 'Markalar',
  isLoading: true,
  isSignout: false,
  userToken: null,
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case SET_TOKEN: {
      return {
        ...state,
        isSignout: false,
        userToken: action.payload,
      };
    }
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    default:
      return state;
  }
}

export default rootReducer;
