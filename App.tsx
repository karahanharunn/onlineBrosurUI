import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './src/redux/reducers/reducer';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Layout from './src/components/Layout';
import { tokenService } from './src/services/TokenService';
// Ignore log notification by message:
enableScreens();
const store = createStore(rootReducer);
const App = (props) => {
  const encodeBase64 = (input) => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = input;
    let output = '';

    for (
      let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || ((map = '='), i % 1);
      output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
      charCode = str.charCodeAt((i += 3 / 4));

      if (charCode > 0xff) {
        console.log(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.",
        );
      }

      block = (block << 8) | charCode;
    }

    return output;
  };
  useEffect(() => {
    const value = 'Basic ' + encodeBase64(`consumer:RB,z6n}qvuJirM84`);
    tokenService.set(value);
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Layout />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
