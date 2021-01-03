import React from 'react';
import {Platform, StatusBar} from 'react-native';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export default function StatusBarComponent() {
  return (
    <StatusBar
      barStyle="dark-content"
      backgroundColor="white"
      style={{height: STATUSBAR_HEIGHT}}
    />
  );
}
