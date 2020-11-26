import React from 'react';
import {tab} from '../constant';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTabsScreen from '../scenes/HomePage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from '../components/Mytab';
import BrandDetail from '../components/BrandDetail/BrandDetail';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'HomeTabs'}
        component={HomeTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Brand"
        component={BrandDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

function HomeTabs() {
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
