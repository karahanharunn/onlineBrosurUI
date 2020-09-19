import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './src/redux/reducers/reducer';
import {enableScreens} from 'react-native-screens';
import Layout from './src/components/organisms/Layout';
enableScreens();
const store = createStore(rootReducer);
const App = (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
