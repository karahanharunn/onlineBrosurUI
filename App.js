import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tab} from './src/constant';
import MyTabBar from './src/components/Mytab';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './src/redux/reducers/reducer';
import {enableScreens} from 'react-native-screens';
enableScreens();
const store = createStore(rootReducer);
const Tab = createBottomTabNavigator();

const App = (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
          {tab.map((item) => (
            <Tab.Screen
              key={item.name}
              name={item.name}
              component={item.component}
              options={item.options}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
