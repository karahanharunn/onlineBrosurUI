import React from 'react';
import {Image} from 'react-native';

export default function Logo() {
  return (
    <Image
      style={{width: 100, height: 30, marginRight: 12}}
      source={require('../../assets/icon.png')}
    />
  );
}
