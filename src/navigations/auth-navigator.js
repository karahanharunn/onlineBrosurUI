import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../scenes/login';

const AuthNavigator = createStackNavigator();

export default function AuthNavigatorScreen() {
  return (
    <AuthNavigator.Navigator headerMode="None" initialRouteName="SignIn">
      <AuthNavigator.Screen name="SignIn" component={LoginScreen} />
      <AuthNavigator.Screen name="SıgnUp" component={LoginScreen} />
    </AuthNavigator.Navigator>
  );
}
