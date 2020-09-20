import React from 'react';
import {StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image';
import { config } from '../../../services/Config';

export default function Image({url}) {
  return (
    <FastImage
      style={{
        ...styles.tinyLogo,
      }}
      source={{
        uri: config.apiUrl + url,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 70,
    height: 70,
    backgroundColor: 'transparent',
  },
});
