import React from 'react';
import AppNavigator from '../../navigations/app-navigator';
import AuthNavigatorScreen from '../../navigations/auth-navigator';
import {useSelector} from 'react-redux';
import {AsyncStorage} from 'react-native';

export default function Layout(props) {
  const userToken = useSelector((state) => state.userToken);
  const remove = async () => {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  };
  remove();
  return userToken ? <AppNavigator /> : <AuthNavigatorScreen />;
}
