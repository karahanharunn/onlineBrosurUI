import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {  SCALE_12 } from '../../styles/spacing';

export default function Button(props) {
  return (
    <TouchableOpacity style={{zIndex:99}} {...props}>
      <Text style={props.text ?? styles.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: SCALE_12,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
