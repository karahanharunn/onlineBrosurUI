import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Lightbox from 'react-native-lightbox';
import {config} from '../../../services/Config';
export default function Image({url, ...rest}) {
  return (
    <Lightbox>
      <FastImage
        style={{
          ...styles.tinyLogo,
        }}
        {...rest}
        source={{
          uri: config.apiUrl + url,
          priority: FastImage.priority.normal,
        }}
      />
    </Lightbox>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 70,
    height: 70,
    backgroundColor: 'transparent',
  },
});
