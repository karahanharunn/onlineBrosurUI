import React from 'react';
import {View, Text} from 'react-native';
const expand = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 30,
};
export default function icon({Icon, size, color}) {
  return <Icon width={expand.size} height={expand[size]} color={color} />;
}
