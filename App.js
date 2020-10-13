import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './src/redux/reducers/reducer';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Layout from './src/components/Layout';

// Ignore log notification by message:
enableScreens();
const store = createStore(rootReducer);
const App = (props) => {
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
