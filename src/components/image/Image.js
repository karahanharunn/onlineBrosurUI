import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Lightbox from 'react-native-lightbox';
import {config} from '../../services/Config';
import {SharedElement} from 'react-navigation-shared-element';
export default function Image({url, children, ...rest}) {
  return (
    <SharedElement style={styles.wrapper} id={`item.${url}.photo`}>
      <FastImage
        style={{
          ...styles.tinyLogo,
        }}
        {...rest}
        source={{
          uri: config.apiUrl + url,
          priority: FastImage.priority.normal,
        }}
        resizeMode="contain">
        {children}
      </FastImage>
    </SharedElement>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    backgroundColor: 'transparent',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
