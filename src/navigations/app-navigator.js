import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {tab} from '../constant';
import MyTabBar from '../components/Mytab';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
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
  );
}
