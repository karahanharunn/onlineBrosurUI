import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tab} from './src/constant';
import MyTabBar from './src/components/Mytab';

const Tab = createBottomTabNavigator();

const App = (props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
    
        tabBar={(props) => <MyTabBar {...props} />}>
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
  );
};

export default App;

