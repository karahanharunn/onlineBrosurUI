import React from 'react';
import AppNavigator from '../navigations/app-navigator';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigatorScreen from '../navigations/auth-navigator';

const Stack = createStackNavigator();

export default function Layout(props) {
  return (
    <Stack.Navigator headerMode="None">
      <Stack.Screen name="App" component={AppNavigator} />
      <Stack.Screen name="Auth" component={AuthNavigatorScreen} />
    </Stack.Navigator>
  );
}
