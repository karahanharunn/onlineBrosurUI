import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

export default function Button(props) {
  return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
}

const styles = StyleSheet.create({});
