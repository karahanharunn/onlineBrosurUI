import React from 'react';
import AppNavigator from '../../navigations/app-navigator';
import AuthNavigatorScreen from '../../navigations/auth-navigator';
import {useSelector} from 'react-redux';
import {AsyncStorage} from 'react-native';

export default function Layout(props) {
  const userToken = useSelector((state) => state.userToken);
  return userToken ? <AppNavigator /> : <AuthNavigatorScreen />;
}
